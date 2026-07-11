import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

export default function MacroCard({
  label,
  current,
  goal,
  unit = "",
}) {
  return (
    <Card>

      <h3>{label}</h3>

      <ProgressBar
        current={current}
        goal={goal}
      />

      <p>
        {current} / {goal} {unit}
      </p>

    </Card>
  );
}