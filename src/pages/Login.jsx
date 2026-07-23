import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);

        console.log("Google Login Success:", result.user);

        navigate("/");
    } catch (error) {
        console.error("Google Login Error:");
        console.error(error.code);
        console.error(error.message);
        console.error(error);
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
            className="min-h-screen relative flex items-center justify-center px-4 bg-cover bg-center"
            style={{
                backgroundImage: "url('/login-bg.png')",
            }}
        >

            <div className="absolute inset-0 bg-black/50"></div>


            <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome Back
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Login to book appointments and manage your profile
                    </p>

                </div>


                {/* Email Login */}

                <form onSubmit={handleEmailLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email Address"
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
                            placeholder="Password"
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
                        className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700"
                    >
                        Login
                    </button>

                </form>


                {/* Divider */}

                <div className="flex items-center gap-3 my-6">

                    <div className="flex-1 h-px bg-gray-300"></div>

                    <span className="text-gray-400 text-sm">
                        OR
                    </span>

                    <div className="flex-1 h-px bg-gray-300"></div>

                </div>



                {/* Google Login */}

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                    <FcGoogle size={24} />
                    Continue with Google
                </button>


                <p className="text-center text-sm text-slate-500 mt-6">
                    Secure login powered by Google Authentication
                </p>


                <p className="text-center text-slate-600 mt-5">

                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="text-teal-600 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>

                </p>


            </div>

        </div>
    );
};


export default Login;