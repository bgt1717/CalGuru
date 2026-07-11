import Layout from "../components/layout/Layout";
import MacroCard from "../components/dashboard/MacroCard";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <Layout>

      <h1 className="section-title">
        Today's Nutrition
      </h1>

      <div className="macro-grid">

        <MacroCard
          label="Calories"
          current={1240}
          goal={2000}
          unit="kcal"
        />

        <MacroCard
          label="Protein"
          current={92}
          goal={150}
          unit="g"
        />

        <MacroCard
          label="Carbs"
          current={161}
          goal={250}
          unit="g"
        />

        <MacroCard
          label="Fat"
          current={44}
          goal={65}
          unit="g"
        />

      </div>

    </Layout>
  );
}