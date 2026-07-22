import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import "./FoodSearch.css";

export default function FoodSearch({
  value,
  onChange,
}) {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      food.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [foods, search]);

  return (
    <div className="food-search">

      <input
        type="text"
        placeholder="Search foods..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="food-results">

        {filteredFoods.map((food) => (

          <div
            key={food._id}
            className={
              value === food._id
                ? "food-option selected"
                : "food-option"
            }
            onClick={() => onChange(food._id)}
          >

            <strong>{food.name}</strong>

            <span>
              {food.calories} kcal
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}