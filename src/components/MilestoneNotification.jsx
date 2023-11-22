import { useContext } from "react";
import { BabyContext } from "../App";

function MileStoneNotification() {
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;

  return (
    <div>
      <p style={{ fontSize: "30px", margin: "0", padding: "0em" }}>
        {babyName} is {babyAge} old today!
      </p>
    </div>
  );
}

export default MileStoneNotification;
