import { useEffect, useState } from "react";
import "./Slideshow.css";

const slides = [
  {
    title: "Track Your Meals",
    description: "Log breakfast, lunch, dinner, and snacks in seconds.",
    img: "/screenshots/slide-1.svg",
  },
  {
    title: "View Nutrition Goals",
    description: "See calories and macros progress on one dashboard.",
    img: "/screenshots/slide-2.svg",
  },
  {
    title: "Search Foods Fast",
    description: "Find food items from your list or add custom entries.",
    img: "/screenshots/slide-3.svg",
  },
  {
    title: "Stay On Track",
    description: "Maintain healthy habits with easy meal summaries.",
    img: "/screenshots/slide-4.svg",
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const { title, description, img } = slides[current];

  return (
    <div className="slideshow">
      <div className="slide-image">
        <img src={img} alt={title} />
      </div>
      <div className="slide-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="slide-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === current ? "active" : ""}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
