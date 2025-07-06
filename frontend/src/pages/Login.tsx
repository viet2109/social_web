import { Field, Form, Formik } from "formik";
import { Lock, LogIn, Mail } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import CustomField from "../components/CustomField";
import type { RootState } from "../redux/store";
import { routes } from "../routes";

// Validation schema
const validationSchema = yup.object({
  email: yup.string().required("Email là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.setting.theme);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // Simulate API call
    await new Promise((resolve) =>
      setTimeout(() => {
        toast.success("Đăng nhập thành công!", {
          onClose: () => {
            resolve(null);
          },
        });
      }, 2000)
    );
    console.log("Login data:", values);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {/* Login Card */}
      <div className="w-full max-w-lg p-8 rounded-2xl border backdrop-blur-sm bg-background-elevated border-border shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            <LogIn className="w-8 h-8 text-slate-50" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Đăng nhập</h1>
          <p className="text-sm text-text-secondary">
            Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
          </p>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <CustomField
                  name="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  icon={<Mail className="h-5 w-5 text-text-muted" />}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Mật khẩu
                </label>
                <CustomField
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  icon={<Lock className="h-5 w-5 text-text-muted" />}
                  showPassword={showPassword}
                  onTogglePassword={togglePasswordVisibility}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <Field name="rememberMe">
                    {({ field }: any) => (
                      <input
                        {...field}
                        type="checkbox"
                        className="rounded border-2 mr-2 accent-primary border-border"
                      />
                    )}
                  </Field>
                  <span className="text-sm text-text-secondary">
                    Ghi nhớ đăng nhập
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm cursor-pointer hover:underline transition-colors text-primary"
                  style={{
                    transition: "var(--transition-fast)",
                  }}
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="w-full cursor-pointer py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-primary to-secondary"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Đăng nhập</span>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={() => navigate(routes.register)}
              className="font-semibold cursor-pointer hover:underline transition-colors  text-primary"
              style={{
                transition: "var(--transition-fast)",
              }}
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
