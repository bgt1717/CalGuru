import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import API from "../api/axios";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";



export default function AddMeal() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const defaultMeal = searchParams.get("meal") || "Breakfast";
  const [foods, setFoods] = useState([]);

  const [form, setForm] = useState({
    foodId: "",
    mealType: defaultMeal,
    servings: 1,
    notes: "",
  });

  useEffect(() => {
    loadFoods();
  }, []);

  async function loadFoods() {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);

      // Select the first food by default
      if (res.data.length > 0) {
        setForm((prev) => ({
          ...prev,
          foodId: res.data[0]._id,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.post("/meals", form);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <Card>

        <h1>Add Meal</h1>

        <form onSubmit={handleSubmit}>

          <label>Meal</label>

          <select
            name="mealType"
            value={form.mealType}
            onChange={handleChange}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
          </select>

          <label>Food</label>

          <select
            name="foodId"
            value={form.foodId}
            onChange={handleChange}
          >
            {foods.map((food) => (
              <option
                key={food._id}
                value={food._id}
              >
                {food.name}
              </option>
            ))}
          </select>

          <Input
            label="Servings"
            type="number"
            name="servings"
            value={form.servings}
            onChange={handleChange}
            min="0.25"
            step="0.25"
          />

          <Input
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />

          <Button type="submit">
            Add Meal
          </Button>

        </form>

      </Card>
    </Layout>
  );
}