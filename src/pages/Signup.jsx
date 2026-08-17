import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      alert(t("auth.accountCreated"));

      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
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

      <div className="relative z-10 w-full max-w-md bg-white/95 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {t("auth.createAccount")}
          </h1>

          <p className="text-slate-500 mt-2">
            {t("auth.signupDesc")}
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder={t("auth.fullNamePlaceholder")}
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="email"
            placeholder={t("auth.emailPlaceholder")}
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
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
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 font-medium transition disabled:opacity-50"
          >
            {loading ? t("auth.creatingAccount") : t("auth.signUp")}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          {t("auth.haveAccount")}{" "}
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:underline ml-1"
          >
            {t("auth.loginBtn")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;