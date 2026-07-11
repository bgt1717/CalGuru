import { useEffect, useState } from "react";

import API from "../api/axios";

import Layout from "../components/layout/Layout";
import MacroCard from "../components/dashboard/MacroCard";
import MealSection from "../components/dashboard/MealSection";
import "./Dashboard.css";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await API.get("/meals/summary");
        setSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadSummary();
  }, []);

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

        <MealSection title="Breakfast" />
        <MealSection title="Lunch" />
        <MealSection title="Dinner" />
        <MealSection title="Snacks" />

      </div>
    </Layout>
  );
}