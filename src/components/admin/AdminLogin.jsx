import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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