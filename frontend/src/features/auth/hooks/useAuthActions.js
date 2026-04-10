import { useState } from "react";
import { loginUser, signupUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useAuthActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async (data) => {
  try {
    setLoading(true);
    setError("");

    // 🔥 FAKE LOGIN (no backend needed)
    const fakeUser = {
      id: 1,
      username: data.email || "tanvi",
      email: data.email,
      role: "STUDENT",
    };

    const fakeToken = "mock-jwt-token";

    // store in auth context
    login(fakeUser, fakeToken);

    // redirect
    navigate("/dashboard");

  } catch (err) {
    setError("Login failed");
  } finally {
    setLoading(false);
  }
};

  const handleSignup = async (data) => {
    try {
      setLoading(true);
      setError("");

      const res = await signupUser(data);

      login(res.data.user, res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleSignup, loading, error };
}