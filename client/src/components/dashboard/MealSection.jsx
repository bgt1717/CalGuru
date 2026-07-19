import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function MealSection({
  mealType,
  meals,
  onDelete,
}) {
  return (
    <Card>
      <div className="meal-header">
        <h2>{mealType}</h2>

        <Link to={`/meals/new?meal=${mealType}`}>
          <Button>+ Add Food</Button>
        </Link>
      </div>

      {meals.length === 0 ? (
        <p className="text-muted">No foods added.</p>
      ) : (
        meals.map((meal) => (
          <div
            key={meal._id}
            className="meal-item"
          >
            <div>
              <strong>{meal.foodName}</strong>

              <p>
                {meal.servings} serving
                {meal.servings > 1 ? "s" : ""}
              </p>

              <p>{meal.nutrition.calories} kcal</p>
            </div>

            <button
              className="delete-btn"
              onClick={() => onDelete(meal._id)}
            >
              ✕
            </button>
          </div>
        ))
      )}
    </Card>
  );
}