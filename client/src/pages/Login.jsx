import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    try {
      const res = await API.post("/auth/login", form);

      login(res.data.token, res.data.user);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">

        <h1>CalGuru</h1>

        <p className="text-muted">
          Track your nutrition effortlessly.
        </p>

        <form onSubmit={handleSubmit}>

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <Button type="submit">
            Login
          </Button>

        </form>

        <p className="text-muted">

          Don't have an account?

          <Link to="/register">
            {" "}Register
          </Link>

        </p>

      </Card>
    </div>
  );
}