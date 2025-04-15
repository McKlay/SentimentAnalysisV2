import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [comment, setComment] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [sentimentCount, setSentimentCount] = useState({
    POSITIVE: 0,
    NEGATIVE: 0,
    NEUTRAL: 0,
  });
  const currentTime = new Date().toLocaleString(); // e.g., "4/14/2025, 2:42:13 PM"
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [darkMode, setDarkMode] = useState(false);


  const analyzeSentiment = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    setSentiment(null);

    try {
      const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      const response = await axios.post(`${BASE_URL}/predict`, { text: comment });

      if (response?.data?.sentiment) {
        const label = response.data.sentiment.toUpperCase();
        const confidence = response.data.confidence_score;

        setSentiment(label);
        setConfidenceScore(confidence);

        setHistory(prev => [
          ...prev,
          {
            text: comment,
            sentiment: label,
            timestamp: currentTime, // 🕓 Add timestamp
            confidence: confidence
          }
        ]);

        setSentimentCount(prev => ({
          ...prev,
          [label]: (prev[label] || 0) + 1
        }));
      } else {
        setSentiment("UNKNOWN");
      }
    } catch (error) {
      console.error("Error calling the API:", error);
      setSentiment("ERROR");
    } finally {
      setLoading(false);
    }
  };

  const getSentimentStyle = () => {
    if (sentiment === "POSITIVE") return { color: "green" };
    if (sentiment === "NEGATIVE") return { color: "red" };
    if (sentiment === "NEUTRAL") return { color: "gray" };
    return {};
  };

  const getEmoji = () => {
    if (sentiment === "POSITIVE") return "😊";
    if (sentiment === "NEGATIVE") return "😞";
    if (sentiment === "NEUTRAL") return "😐";
    return "";
  };

  const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{
      label: 'Sentiment Distribution',
      data: [
        sentimentCount.POSITIVE,
        sentimentCount.NEGATIVE,
        sentimentCount.NEUTRAL
      ],
      backgroundColor: [
        'rgba(0, 200, 83, 0.6)',  // green
        'rgba(255, 99, 132, 0.6)',  // red
        'rgba(201, 203, 207, 0.6)'  // gray
      ],
      borderWidth: 1,
    }]
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;

    // 👀 Log current session history
    console.log("History Preview:", history);
 
    const headers = ['Comment', 'Sentiment', 'Confidence', 'Timestamp'];
    const rows = history.map(entry => [
      entry.text || "",
      entry.sentiment || "",
      entry.confidence !== undefined ? `${entry.confidence}%` : "",
      entry.timestamp || ""
    ]);
    
  
    let csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sentiment_predictions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>🎯 YouTube Comment Sentiment Analyzer</h1>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            style={{ marginRight: '10px' }}
          />
          🌗 Toggle Dark Mode
        </label>
      </div>

      <textarea
        rows="6"
        placeholder="Paste your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comment-box"
      />

      <br />
      <button className="analyze-btn" onClick={analyzeSentiment} disabled={loading}>
        {loading ? '🔄 Analyzing...' : '🚀 Analyze Sentiment'}
      </button>

      {sentiment && (
        <div style={{ marginTop: '20px', fontSize: '22px', fontWeight: 'bold' }}>
          Prediction: <span style={getSentimentStyle()}>{sentiment} {getEmoji()}</span><br />
          Confidence: <span>{confidenceScore}%</span>
        </div>
      )}

      <hr style={{ margin: "40px 0" }} />

      <button onClick={() => {
        setHistory([]);
        setSentimentCount({ POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 });
      }} style={{ marginBottom: '20px', padding: '8px 16px' }}>
        🧹 Clear History
      </button>

      <button
        onClick={handleExportCSV}
        style={{ marginLeft: '10px', padding: '6px 12px' }}
      >
        Export to CSV
      </button>


      <h2>🧾 Prediction History</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {history.map((item, index) => (
          <li key={index} style={{
            margin: '10px auto',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxWidth: '600px',
            backgroundColor: item.sentiment === "POSITIVE" ? "#e6ffe6"
              : item.sentiment === "NEGATIVE" ? "#ffe6e6"
              : "#f0f0f0"
          }}>
            <strong>{item.sentiment}</strong>: {item.text}
            <div style={{ textAlign: 'center' }}>
              <small>{item.timestamp}</small><br />
              <small>Confidence: {item.confidence}%</small>
            </div>
          </li>
        ))}
      </ul>

      <h2>📊 Sentiment Chart</h2>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>

    </div>
  );
}

export default App;
