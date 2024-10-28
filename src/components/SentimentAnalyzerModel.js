import React, { useState } from "react";
import axios from "axios";

const SentimentAnalyzerModel = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

    /* Add a sentiment summary like what they were happy or unhappy about*/
    /* See if the sentiment is actually a proper sentnece */

  const analyzeSentiment = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        text: text,
      });
      setResult(response.data);
      setError("");
    } catch (err) {
      setError("Error analyzing sentiment.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Sentiment Analysis by neatfreak27</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze sentiment"
        rows="4"
        cols="50"
        style={{ marginBottom: "10px" }}
      ></textarea>
      <br />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>
      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {result && (
          <div>
            <p>I feel that this is a {result.label.toLowerCase()} sentiment</p>
            <p>I am {(result.score * 100).toFixed(2)}% confident</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalyzerModel;