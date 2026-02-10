import random
import datetime

def predict_fraud_score(ticket_code):
    # Mock AI: analyze code pattern
    # Determine if it looks suspicious (e.g. strict length, specific prefix)
    if "TEST" in ticket_code:
        return 0.9
    if len(ticket_code) < 5:
        return 0.7
    return round(random.uniform(0, 0.2), 2)

def predict_crowd_levels(zone_capacity, current_count):
    # Mock AI: Predict next hour trend
    trend = random.choice([-10, 0, 10, 20, 50])
    prediction = current_count + trend
    risk = "Low"
    if prediction > zone_capacity * 0.9:
        risk = "High"
    elif prediction > zone_capacity * 0.7:
        risk = "Medium"
    
    return {
        "predicted_count": max(0, prediction),
        "risk_level": risk,
        "suggestion": "Open Gate B" if risk == "High" else "Monitor"
    }

def forecast_energy_usage(current_load):
    # Simple linear projection + noise
    forecast = [current_load * (1 + random.uniform(-0.1, 0.1)) for _ in range(5)]
    return forecast

def analyze_sentiment(feedback_text):
    # Mock sentiment analysis
    words = feedback_text.lower().split()
    positive = ["good", "great", "excellent", "fast", "smooth"]
    negative = ["bad", "slow", "crowded", "dirty", "expensive"]
    
    score = 0
    for w in words:
        if w in positive: score += 1
        if w in negative: score -= 1
    
    return "Positive" if score > 0 else "Negative" if score < 0 else "Neutral"
