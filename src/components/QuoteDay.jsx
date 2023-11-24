import React, { useState, useEffect } from "react";

function QuoteDay() {
  const [quoteData, setQuoteData] = useState({});

  useEffect(() => {
    const fetchQuoteData = async () => {
      const resp = await fetch("https://api.quotable.io/quotes/random");
      const data = await resp.json();
      const fetchedData = data[0];
      setQuoteData(fetchedData);
    };
    fetchQuoteData();
  }, []);

  return (
    <div
      className="quoteOTDay"
      style={{
        marginBottom: 30,
        color: "black",
      }}
    >
      <h4 style={{ margin: "0", padding: "0.2em" }}>{quoteData.content}</h4>
      <h5 style={{ margin: "0", padding: "0.2em" }}>- {quoteData.author}</h5>
    </div>
  );
}

export default QuoteDay;
