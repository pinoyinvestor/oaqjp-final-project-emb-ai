"""
Flask web server for Emotion Detection
"""

from flask import Flask, request, jsonify, render_template
from EmotionDetection.emotion_detection import emotion_detector

app = Flask(__name__)

@app.route('/')
def index():
    """
    Render the index page
    """
    return render_template('index.html')

@app.route('/emotionDetector', methods=['POST'])
def detect_emotion():
    """
    Endpoint to detect emotions from the provided text
    """
    text = request.form['text']
    result = emotion_detector(text)

    if result.get('dominant_emotion') is None:
        return jsonify({"error": "Invalid text! Please try again!"}), 400

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
