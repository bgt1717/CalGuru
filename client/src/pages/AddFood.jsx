import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function AddFood() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    servingSize: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.post("/foods", form);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>

      <Card>

        <h1>Add Food</h1>

        <form onSubmit={handleSubmit}>

          <Input
            label="Food Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Serving Size"
            name="servingSize"
            value={form.servingSize}
            onChange={handleChange}
            placeholder="100 g"
          />

          <Input
            label="Calories"
            name="calories"
            type="number"
            value={form.calories}
            onChange={handleChange}
            required
          />

          <Input
            label="Protein"
            name="protein"
            type="number"
            value={form.protein}
            onChange={handleChange}
          />

          <Input
            label="Carbs"
            name="carbs"
            type="number"
            value={form.carbs}
            onChange={handleChange}
          />

          <Input
            label="Fat"
            name="fat"
            type="number"
            value={form.fat}
            onChange={handleChange}
          />

          <Button type="submit">
            Save Food
          </Button>

        </form>

      </Card>

    </Layout>
  );
}