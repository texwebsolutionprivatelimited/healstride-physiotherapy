import { useState, useEffect } from "react";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase"; 
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const unsubscribe =
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigate("/");
                }
            });

        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);

            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );

            console.log(
                "Google Login Success:",
                result.user
            );

            localStorage.setItem(
                "role",
                "user"
            );

            navigate("/");
        } catch (error) {
            console.error(
                "Google Login Error:"
            );
            console.error(error.code);
            console.error(error.message);
            console.error(error);

            alert(
                error.message ||
                "Google Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (
        e
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            localStorage.setItem(
                "role",
                "user"
            );

            navigate("/");
        } catch (error) {
            console.error(error);

            alert(
                error.message ||
                "Invalid Email or Password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
           min-h-[calc(100vh-80px)]
    relative
    flex
    items-center
    justify-center
    px-4
    py-10
    bg-cover
    bg-center
  "
            style={{
                backgroundImage:
                    "url('/login-bg.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Blur */}
            <div className="absolute top-10 left-10 w-52 h-52 bg-teal-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-cyan-500/20 blur-3xl rounded-full" />

            {/* Card */}
            <div
                className="
          relative
          z-10
          w-full
          max-w-md
          bg-white/95
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          p-8
        "
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome Back
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Login to book appointments
                        and manage your profile
                    </p>
                </div>

                <form
                    onSubmit={
                        handleEmailLogin
                    }
                    className="space-y-4"
                >
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email:
                                    e.target.value,
                            })
                        }
                        className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-teal-500
            "
                    />

                    <div className="relative">
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Password"
                            required
                            value={
                                formData.password
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password:
                                        e.target.value,
                                })
                            }
                            className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                pr-12
                outline-none
                focus:ring-2
                focus:ring-teal-500
              "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
                        >
                            {showPassword ? (
                                <EyeOff
                                    size={20}
                                />
                            ) : (
                                <Eye
                                    size={20}
                                />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
              w-full
              bg-teal-600
              hover:bg-teal-700
              text-white
              py-3
              rounded-xl
              transition
              disabled:opacity-60
              flex
              items-center
              justify-center
              gap-2
            "
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Logging In...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-300" />

                    <span className="text-gray-400 text-sm">
                        OR
                    </span>

                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Google Login */}
                <button
                    onClick={
                        handleGoogleLogin
                    }
                    disabled={loading}
                    className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            border
            border-gray-300
            py-3
            rounded-xl
            hover:bg-gray-50
            transition
            font-medium
            disabled:opacity-60
          "
                >
                    <FcGoogle size={24} />

                    {loading
                        ? "Please Wait..."
                        : "Continue with Google"}
                </button>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Secure login powered by
                    Firebase Authentication
                </p>

                <p className="text-center text-slate-600 mt-5">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="
              text-teal-600
              font-semibold
              hover:underline
            "
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login; 