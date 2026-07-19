import { useEffect, useState } from "react";

import API from "../api/axios";

import Layout from "../components/layout/Layout";
import MacroCard from "../components/dashboard/MacroCard";
import MealSection from "../components/dashboard/MealSection";
import "./Dashboard.css";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [summaryRes, mealsRes] = await Promise.all([
        API.get("/meals/summary"),
        API.get("/meals"),
      ]);

      setSummary(summaryRes.data);
      setMeals(mealsRes.data);

    } catch (err) {
      console.error(err);
    }
  }
  if (!summary) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
}
  return (
    <Layout>
      <h1 className="section-title">
        Today's Nutrition
      </h1>

      <div className="macro-grid">

        <MacroCard
          label="Calories"
          current={summary.totals.calories}
          goal={summary.goals.calories}
          unit="kcal"
        />

        <MacroCard
          label="Protein"
          current={summary.totals.protein}
          goal={summary.goals.protein}
          unit="g"
        />

        <MacroCard
          label="Carbs"
          current={summary.totals.carbs}
          goal={summary.goals.carbs}
          unit="g"
        />

        <MacroCard
          label="Fat"
          current={summary.totals.fat}
          goal={summary.goals.fat}
          unit="g"
        />
      
      </div>

      <div className="meals">

      <MealSection
          mealType="Breakfast"
          meals={meals.filter(
              meal => meal.mealType === "Breakfast"
          )}
      />

      <MealSection
          mealType="Lunch"
          meals={meals.filter(
              meal => meal.mealType === "Lunch"
          )}
      />

      <MealSection
          mealType="Dinner"
          meals={meals.filter(
              meal => meal.mealType === "Dinner"
          )}
      />

      <MealSection
          mealType="Snacks"
          meals={meals.filter(
              meal => meal.mealType === "Snacks"
          )}
      />

      </div>
    </Layout>
  );
}