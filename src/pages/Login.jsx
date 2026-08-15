import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 py-8 sm:py-12 bg-cover bg-center"
      style={{
        backgroundImage: "url('/login-bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {t("auth.welcomeBack")}
          </h1>

          <p className="text-slate-500 mt-2">
            {t("auth.loginDesc")}
          </p>
        </div>

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder={t("auth.emailPlaceholder")}
            required
            className="w-full border rounded-xl px-4 py-3"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.passwordPlaceholder")}
              required
              className="w-full border rounded-xl px-4 py-3 pr-12"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 font-medium transition"
          >
            {t("auth.loginBtn")}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">
            {t("auth.or")}
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition font-medium"
        >
          <FcGoogle size={24} />
          {t("auth.googleLogin")}
        </button>

        <p className="text-center text-sm text-slate-500 mt-6">
          {t("auth.secureNotice")}
        </p>

        <p className="text-center text-slate-600 mt-5">
          {t("auth.noAccount")}{" "}
          <Link
            to="/signup"
            className="text-teal-600 font-semibold hover:underline ml-1"
          >
            {t("auth.signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;