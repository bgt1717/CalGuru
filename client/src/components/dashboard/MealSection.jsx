import Card from "../ui/Card";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function MealSection({
    mealType,
    meals,
}) {
  return (
    <Card className="meal-card">

      <div className="meal-header">

        <h2>{mealType}</h2>

      <Link to={`/meals/new?meal=${mealType}`}>
          <Button variant="secondary">
              + Add Food
          </Button>
      </Link>

      </div>
  {meals.length === 0 ? (

      <p className="text-muted">
          No foods added.
      </p>

  ) : (

      meals.map(meal => (

          <div
              key={meal._id}
              className="meal-item"
          >

              <strong>
                  {meal.foodName}
              </strong>

              <p>

                  {meal.servings} serving

                  {meal.servings > 1 && "s"}

              </p>

              <p>

                  {meal.nutrition.calories} kcal

              </p>

          </div>

      ))

  )}

    </Card>
  );
}