import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/admin");
    }
  });

  return () => unsubscribe();
}, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/admin");
    } catch (err) {
  console.log(err);
  console.log(err.code);
  console.log(err.message);

  setError(err.message);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-8">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full border rounded-xl p-3 pr-12"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 transition"
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>

</div>

          <button
            className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;