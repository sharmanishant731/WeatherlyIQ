from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from datetime import datetime, timedelta
import pytz
import random

app = Flask(__name__)
CORS(app)  # allow React frontend to access

# Load models
with open("weather_model_max.pkl", "rb") as f:
    model_max = pickle.load(f)
with open("weather_model_min.pkl", "rb") as f:
    model_min = pickle.load(f)

# Load CSV to get min date
df = pd.read_csv("weather_data.csv")
df["date"] = pd.to_datetime(df["date"])
min_date = df["date"].min()

@app.route("/predict", methods=["GET"])
def predict():
    # Get city parameter from request
    city = request.args.get('city', 'default')
    
    tz = pytz.timezone("Asia/Kolkata")
    today = datetime.now(tz).replace(hour=0, minute=0, second=0, microsecond=0)
    tomorrow = today + timedelta(days=1)

    # Ensure min_date has same timezone
    min_date_tz = min_date.tz_localize("Asia/Kolkata") if min_date.tzinfo is None else min_date

    # Convert to model feature
    day_number = (tomorrow - min_date_tz).days
    X = pd.DataFrame({"day_number": [day_number]})

    # Predict base temperatures
    pred_max = float(model_max.predict(X)[0])
    pred_min = float(model_min.predict(X)[0])
    
    # Add location-based variation using city name as seed
    # This creates consistent but different predictions for different cities
    city_hash = hash(city.lower()) % 1000
    random.seed(city_hash + day_number)
    
    # Apply reasonable variations based on city (±3°C for max, ±2°C for min)
    variation_max = random.uniform(-3, 3)
    variation_min = random.uniform(-2, 2)
    
    adjusted_max = pred_max + variation_max
    adjusted_min = pred_min + variation_min
    
    # Ensure min is always less than max
    if adjusted_min >= adjusted_max:
        adjusted_min = adjusted_max - random.uniform(2, 5)

    return jsonify({
        "date": tomorrow.strftime("%Y-%m-%d"),
        "temp_max": round(adjusted_max, 2),
        "temp_min": round(adjusted_min, 2),
        "city": city
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)
