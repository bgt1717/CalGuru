import { useMemo } from "react";
import "./FoodSearch.css";

export default function FoodSearch({
  foods = [],
  search = "",
  setSearch = () => {},
  onAddFood = () => {},
  onDeleteFood = () => {},
}) {
  const filteredFoods = useMemo(() => {
    if (!search.trim()) return [];

    return foods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [foods, search]);

  return (
    <div className="food-search-container">
      <div className="food-search">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {search.trim() !== "" && (
        <div className="food-results">
          {filteredFoods.length === 0 ? (
            <div className="empty-results">
              <h3>No foods found</h3>
              <p>Try searching for "banana", "rice", or "chicken".</p>
            </div>
          ) : (
            filteredFoods.map((food) => (
              <div className="food-card" key={food._id}>
                <div className="food-header">
                  <h3>{food.name}</h3>

                  <span
                    className={`badge ${
                      food.isPublic ? "public" : "personal"
                    }`}
                  >
                    {food.isPublic ? "USDA" : "My Food"}
                  </span>
                </div>

                <div className="food-calories">
                  {food.calories} kcal
                </div>

                <div className="food-macros">
                  <span>
                    <strong>P</strong> {food.protein}g
                  </span>

                  <span>
                    <strong>C</strong> {food.carbs}g
                  </span>

                  <span>
                    <strong>F</strong> {food.fat}g
                  </span>
                </div>

                <div className="food-actions">
                  <button
                    className="add-btn"
                    onClick={() => onAddFood(food)}
                  >
                    + Add
                  </button>

                  {!food.isPublic && (
                    <button
                      className="delete-btn"
                      onClick={() => onDeleteFood(food._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}