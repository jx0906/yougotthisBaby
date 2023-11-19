import { useState } from "react";
import { BabyContext } from "../Home";

function SignupForm () {

    const [babySignUpData, setBabySignUpData] = useState {
        babyName: "",
        babyName: "",
        babyDOB: 0,
        babyWeight: 0,
        babyHeight: 0,
      };

    const handleSignupSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      console.log(formData);
      const data = Object.fromEntries(formData);
  
      const payload = {
        ...data,
        celebrated: true,
        description: "",
        likes: 0,
      };
  
      async function createBaby(babySignupData) {
        const response = await fetch("http://localhost:3000/api/holidays", {
          method: "POST", // 'PUT', 'GET', 'DELETE'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const jsonObj = await response.json();
        addHoliday(jsonObj);
      }
  
      createHoliday(payload);
    };
  
    return (
      <form onSubmit={handleSignupSubmit}>
        <label>
          Babyname:
          <input type="text" name="babyName" value={babyName} placeholder="enter desired babyName (case-sensitive)" required />
        </label>
        <div name="Baby Profile">
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
    );
  }
  
  export default NewForm;
  