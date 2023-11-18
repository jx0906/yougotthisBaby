import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

function QuoteDay() {
  const [quoteData, setQuoteData] = useState({});
  // quoteData defined as obj cos I will be calling for the first array from API output,
  // which is in the form of an object

  useEffect(() => {
    const fetchQuoteData = async () => {
      const resp = await fetch("https://api.quotable.io/quotes/random");
      // Parses JSON response,eg:
      // [
      //     {
      //       "_id": "apQ8nGGjT14_",
      //       "content": "Love is composed of a single soul inhabiting two bodies.",
      //       "author": "Aristotle",
      //       "tags": [
      //         "Famous Quotes"
      //       ],
      //       "authorSlug": "aristotle",
      //       "length": 56,
      //       "dateAdded": "2019-12-23",
      //       "dateModified": "2023-04-14"
      //     }
      //   ]
      const data = await resp.json();
      const fetchedData = data[0];
      setQuoteData(fetchedData);
    };
    // how to catch errors without using try{}?
    // console.log(`Failed to fetch data: ${errMsg}`);

    fetchQuoteData();
  }, []); //only run on first payload

  return (
    <div
      className="quoteOTDay"
      style={{
        marginBottom: 50,
        color: "black",
      }}
    >
      <h4>{quoteData.content}</h4>
      <h6>- {quoteData.author}</h6>
    </div>
  );
}

export default QuoteDay;
