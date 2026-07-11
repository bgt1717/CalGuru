import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api/axios";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import "./Foods.css";

export default function Foods() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  async function loadFoods() {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <div className="foods-header">

        <h1>Foods</h1>

        <Link to="/foods/new">
          <Button>Add Food</Button>
        </Link>

      </div>

      <div className="foods-grid">

        {foods.map((food) => (
          <Card key={food._id}>

            <h3>{food.name}</h3>

            <p>{food.servingSize}</p>

            <p>{food.calories} kcal</p>

            <p>P {food.protein}g</p>

            <p>C {food.carbs}g</p>

            <p>F {food.fat}g</p>

          </Card>
        ))}

      </div>
    </Layout>
  );
}