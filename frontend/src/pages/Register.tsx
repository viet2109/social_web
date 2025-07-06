import { Field, Form, Formik } from "formik";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import CustomField from "../components/CustomField";
import { routes } from "../routes";

// Validation schema
const validationSchema = yup.object({
  fullName: yup.string().required("Họ tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "Bạn phải đồng ý với điều khoản và chính sách"),
});

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // Simulate API call
    await new Promise((resolve) =>
      setTimeout(() => {
        toast.success("Đăng ký thành công!", {
          onClose: () => {
            resolve(null);
          },
        });
      }, 2000)
    );
    console.log("Register data:", values);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {/* Register Card */}
      <div className="w-full max-w-lg p-8 rounded-2xl border backdrop-blur-sm bg-background-elevated border-border shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            <UserPlus className="w-8 h-8 text-slate-50" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Đăng ký</h1>
          <p className="text-sm text-text-secondary">
            Tạo tài khoản mới để bắt đầu sử dụng dịch vụ của chúng tôi.
          </p>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2"
                >
                  Họ và tên
                </label>
                <CustomField
                  name="fullName"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  icon={<User className="h-5 w-5 text-text-muted" />}
                />
              </div>

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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2"
                >
                  Xác nhận mật khẩu
                </label>
                <CustomField
                  name="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu của bạn"
                  icon={<Lock className="h-5 w-5 text-text-muted" />}
                  showPassword={showConfirmPassword}
                  onTogglePassword={toggleConfirmPasswordVisibility}
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <label className="flex items-start cursor-pointer">
                  <Field name="agreeTerms">
                    {({ field }: any) => (
                      <input
                        {...field}
                        type="checkbox"
                        className="rounded border-2 mr-3 mt-1 accent-primary border-border"
                      />
                    )}
                  </Field>
                  <span className="text-sm text-text-secondary leading-relaxed">
                    Tôi đồng ý với{" "}
                    <button
                      type="button"
                      className="cursor-pointer hover:underline transition-colors text-primary"
                      style={{
                        transition: "var(--transition-fast)",
                      }}
                    >
                      Điều khoản sử dụng
                    </button>{" "}
                    và{" "}
                    <button
                      type="button"
                      className="cursor-pointer hover:underline transition-colors text-primary"
                      style={{
                        transition: "var(--transition-fast)",
                      }}
                    >
                      Chính sách bảo mật
                    </button>
                  </span>
                </label>
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
                    <span>Đang đăng ký...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Đăng ký</span>
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
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={() => navigate(routes.login)}
              className="font-semibold cursor-pointer hover:underline transition-colors text-primary"
              style={{
                transition: "var(--transition-fast)",
              }}
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
