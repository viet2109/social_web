import { ErrorMessage, Field } from "formik";
import { Eye, EyeOff } from "lucide-react";

const CustomField: React.FC<{
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}> = ({ name, type, placeholder, icon, showPassword, onTogglePassword }) => (
  <Field name={name}>
    {({ field, meta }: any) => (
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
          <input
            {...field}
            type={name.toLowerCase().includes("password") && showPassword ? "text" : type}
            className={`w-full bg-background px-10 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus ${
              meta.touched && meta.error ? "border-error" : "border-border"
            }`}
            placeholder={placeholder}
          />
          {name.toLowerCase().includes("password") && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute inset-y-0 right-0 text-text-muted pr-3 flex items-center transition-colors"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        <ErrorMessage name={name}>
          {(msg) => <p className="mt-2 text-sm text-error">{msg}</p>}
        </ErrorMessage>
      </div>
    )}
  </Field>
);

export default CustomField;
