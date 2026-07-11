import Card from "../ui/Card";
import Button from "../ui/Button";

export default function MealSection({ title }) {
  return (
    <Card className="meal-card">

      <div className="meal-header">

        <h2>{title}</h2>

        <Button variant="secondary">
          + Add Food
        </Button>

      </div>

      <p className="text-muted">
        No foods added.
      </p>

    </Card>
  );
}