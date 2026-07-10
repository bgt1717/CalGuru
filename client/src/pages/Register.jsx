import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create the account
      await API.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // Automatically log the user in
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      login(res.data.token, res.data.user);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">

        <h1>Create Account</h1>

        <p className="text-muted">
          Start tracking your nutrition today.
        </p>

        <form onSubmit={handleSubmit}>

          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter a username"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <Button type="submit">
            Create Account
          </Button>

        </form>

        <p className="text-muted">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
}