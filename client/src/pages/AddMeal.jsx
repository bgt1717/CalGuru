import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import API from "../api/axios";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FoodSearch from "../components/foods/FoodSearch";

export default function AddMeal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultMeal = searchParams.get("meal") || "Breakfast";

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

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

  function handleAddFood(food) {
    setForm((prev) => ({
      ...prev,
      foodId: food._id,
    }));

    // Optional: clear search after selecting
    setSearch("");
  }

  async function handleDeleteFood(id) {
    if (!window.confirm("Delete this food?")) return;

    try {
      await API.delete(`/foods/${id}`);

      const updatedFoods = foods.filter((food) => food._id !== id);
      setFoods(updatedFoods);

      // If the deleted food was selected, select the first remaining food
      if (form.foodId === id) {
        setForm((prev) => ({
          ...prev,
          foodId: updatedFoods.length ? updatedFoods[0]._id : "",
        }));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete food.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.foodId) {
      alert("Please select a food.");
      return;
    }

    try {
      await API.post("/meals", form);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add meal.");
    }
  }

  const selectedFood = foods.find((food) => food._id === form.foodId);

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

          <label>Search Food</label>

          <FoodSearch
            foods={foods}
            search={search}
            setSearch={setSearch}
            onAddFood={handleAddFood}
            onDeleteFood={handleDeleteFood}
          />

          {selectedFood && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#f9f9f9",
              }}
            >
              <h3>Selected Food</h3>

              <p>
                <strong>{selectedFood.name}</strong>
              </p>

              <p>
                {selectedFood.calories} kcal • P {selectedFood.protein}g • C{" "}
                {selectedFood.carbs}g • F {selectedFood.fat}g
              </p>
            </div>
          )}

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

          <Button type="submit">Add Meal</Button>
        </form>
      </Card>
    </Layout>
  );
}