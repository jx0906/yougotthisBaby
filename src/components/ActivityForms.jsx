import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BabyContext } from "../Home";

function ActivityForm({setActivitytoLog}) {
    const [activity, setActivity] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const activity = params.activityToLog;
        props.setActivity(activity);
    }

    return(
              <form onSubmit={()=> <CreateRecord/>}>    
              
              <div name="Activity Overview">
                <label>
                  Date and Time:
                  <input type="datetime-local" name="dataTime" value={dateTime} required />
                </label>
        
                <label for="activity">Activity:</label>
                  <select id="activity" name="activity">
                    <option value="Feed">Feed</option>
                    <option value="Diaper">Diaper</option>
                    <option value="Sleep">Sleep</option>
                    <option value="Play">Play</option>
                    <option value="Doctor's">Doc's</option>
                  </select>
        
                <label>
                  Duration
                  <input type="number" name="duration" value={duration} required />
                </label>
                </div>
        
    <div name="diaper">
           showTodos ?  <ToDoList todos={todos} : null>
        <label for="diaperType">Diaper Type:</label>
          <select id="diaperType" name="diaperType">
            <option value="Pee">Pee</option>
            <option value="Poop">Poop</option>
            <option value="Both">Both</option>
          </select>

)
}

          <label for="sleepType">Sleep Type:</label>
          <select id="sleepType" name="sleepType" onSelect={(e)=> {const sleepType = e.target.value}}>
            <option value="Nap">Nap</option>
            <option value="Sleep">Night</option>
          </select>

        <label>
            Name of Baby:
        <input type="text" name="babyName" value={babyName} required />
      </label>
      <label>
        Baby's Date of Birth:
        </label>
        <input type="datetime-local" name="babyDOB" value={babyDOB} required>
        <label>
            Weight of Baby:
        <input type="number" name="babyWeight" value={babyWeight} />
      </label>
      <label>
            Height of Baby:
        <input type="number" name="babyHeight" value={babyHeight} />
      </label>
      </div>
      </form>
    )
  }
}