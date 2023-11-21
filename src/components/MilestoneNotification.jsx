import { useContext } from "react";
import { BabyContext } from "../App";

function MileStoneNotification() {
  const { babyContext } = useContext(BabyContext);
  const babyName = babyContext.babyName;
  const babyAge = babyContext.babyAge;

  return (
    <div>
      <p>
        {babyName} is {babyAge} old!
      </p>
    </div>
  );
}

export default MileStoneNotification;
