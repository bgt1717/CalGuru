import "./ProgressBar.css";

export default function ProgressBar({
  current,
  goal,
}) {
  const percent = Math.min((current / goal) * 100, 100);

  return (
    <div className="progress">

      <div
        className="progress-fill"
        style={{
          width: `${percent}%`,
        }}
      />

    </div>
  );
}