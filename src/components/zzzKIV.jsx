For icons in welcomepage:
import { IconButton } from "@chakra-ui/react";
import { TbMilk } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineToys } from "react-icons/md";
import { GiUnderwearShorts, GiNightSleep } from "react-icons/gi";

<div className="activities">
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg" // xs, sm, md, or lg
          aria-label="Feed" //for screen readers to give it meaning
          fontSize="20px"
          name="Feed"
          value="Feed"
          type="click"
          onClick={activityOnClick}
          icon={<TbMilk />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Diaper" //for screen readers to give it meaning
          fontSize="20px"
          name="Diaper"
          value="Diaper"
          type="click"
          onClick={activityOnClick}
          icon={<GiUnderwearShorts />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Sleep" //for screen readers to give it meaning
          fontSize="20px"
          name="Sleep"
          value="Sleep"
          type="click"
          onClick={activityOnClick}
          icon={<GiNightSleep />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Play" //for screen readers to give it meaning
          fontSize="20px"
          name="Play"
          value="Play"
          type="click"
          onClick={activityOnClick}
          icon={<MdOutlineToys />}
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          size="lg"
          aria-label="Play" //for screen readers to give it meaning
          fontSize="20px"
          name="Doctor's"
          value="Doctor's"
          type="click"
          onClick={activityOnClick}
          icon={<FaUserDoctor />}
        />
      </div>

      //   (old code here)



//   function handleSubmitforEdit() {
//     evt.preventDefault();
//     const updateSelActivity = async () => {
//       const response = await fetch(`${baseURL}?id='${selActivityId}'`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "Bearer patIefr5XHGrnjTal.ce642a147091cffd80d78258215e6695909498a75c9c7d5c91fbce5f3b3fc91f",
//         },
//         body: JSON.stringify(activityData),
//       });

//       const fetchedActivityLog = await res.json();
//       console.log("fetchedActivityLog = " + JSON.stringify(fetchedActivityLog)); // o/p: {"records": [
//       //   {
//       //     "id": "recw8F6jPp2e28SZx",
//       //     "createdTime": "2023-11-18T14:59:07.000Z",
//       //     "fields": {
//       //       "babyName": "baby2",
//       //       "dateTime": "2023-11-05T14:59:00.000Z",
//       //       "milkType": "Pumped Milk",
//       //       "milkVol": 150,
//       //       "activity": "Feed"
//       //     }
//       //   },
//       //   {
//       //     "id": "recaDWb3PB1L72vBv",
//       //     "createdTime": "2023-11-18T18:14:14.000Z",
//       //     "fields": {
//       //       "babyName": "baby2",
//       //       "dateTime": "2023-09-11T18:14:00.000Z",
//       //       "visitDocType": "Check-up",
//       //       "docName": "Carol Chan",
//       //       "activity": "Doctor's"
//       //     }
//       //   },
//       //   {
//       //     "id": "recWaxGPLztvplLQ6",
//       //     "createdTime": "2023-11-20T01:51:26.000Z",
//       //     "fields": {
//       //       "babyName": "baby2",
//       //       "dateTime": "2023-08-02T01:51:00.000Z",
//       //       "duration": 600,
//       //       "playType": "read a book",
//       //       "activity": "Play"
//       //     }
//       //   }
//       // ]

//       const allActivityData = fetchedActivityLog.records;
//       console.log("allActivityData = " + JSON.stringify(allActivityData)); //output (sample)
//       // {
//       //   "id": "recw8F6jPp2e28SZx",
//       //   "createdTime": "2023-11-18T14:59:07.000Z",
//       //   "fields": {
//       //     "babyName": "baby2",
//       //     "dateTime": "2023-11-05T14:59:00.000Z",
//       //     "milkType": "Pumped Milk",
//       //     "milkVol": 150,
//       //     "activity": "Feed"
//       //   }
//       // }

//       // Convert the dateTime string to a Date object
//       activityData.forEach((entry) => {
//         const date = new Date(entry.fields.dateTime);

//         // Format the date as a readable string according to the system locale
//         entry.fields.dateTime = date.toLocaleString();

//         // Format the date as a readable string in GMT+8
//         // entry.fields.dateTime = date.toLocaleString("en-US", {
//         //   timeZone: "Asia/Singapore", // Adjust for the specific time zone you need
//         //   year: "numeric",
//         //   month: "numeric",
//         //   day: "numeric",
//         //   hour: "numeric",
//         //   minute: "numeric",
//         //   second: "numeric",
//       });

//       console.log("activityData = " + activityData); //   output (dateTime before normalisation): (3) [{…}, {…}, {…}] = [
//       //     {
//       //         "id": "recw8F6jPp2e28SZx",
//       //         "fields": {
//       //             "dateTime": "2023-11-05T14:59:00.000Z",
//       //             duration: undefined,
//       //             "activity": "Feed"
//       //         }
//       //     },
//       //     {
//       //         "id": "recaDWb3PB1L72vBv",
//       //         "fields": {
//       //             "dateTime": "2023-09-11T18:14:00.000Z",
//       //             duration: undefined
//       //             "activity": "Doctor's"
//       //         }
//       //     },
//       //     {
//       //         "id": "recWaxGPLztvplLQ6",
//       //         "fields": {
//       //             "dateTime": "2023-08-02T01:51:00.000Z",
//       //             "duration": 600,
//       //             "activity": "Play"
//       //         }
//       //     }
//       // ]

//       console.log("activityData = " + JSON.stringify(activityData));
//       setAData(activityData);
//     };
//   }


// export default EditActivity;
