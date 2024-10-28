from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

# Initialize Flask app and apply CORS
app = Flask(__name__)
CORS(app)  # This will allow CORS for all routes

# Initialize the sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis")

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    text = data.get("text", "")
    # Analyze sentiment
    result = sentiment_analyzer(text)
    return jsonify(result[0])

if __name__ == '__main__':
    app.run(debug=True)
