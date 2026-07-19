import Card from "../ui/Card";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function MealSection({ title }) {
  return (
    <Card className="meal-card">

      <div className="meal-header">

        <h2>{title}</h2>

      <Link to="/foods/new">
          <Button variant="secondary">
              + Add Food
          </Button>
      </Link>

      </div>

      <p className="text-muted">
        No foods added.
      </p>

    </Card>
  );
}