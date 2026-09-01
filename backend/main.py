from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="HeartCare AI API")

# React frontend connection
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",
    "http://localhost:3000",
    "https://heartcare-ai-phi.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model
try:
    with open("heart_model.pkl", "rb") as file:
        model = pickle.load(file)
except Exception as e:
    model = None
    print("Model loading error:", e)


# Input data
class HeartData(BaseModel):
    age: float
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int


@app.get("/")
def home():
    return {
        "message": "HeartCare AI Backend is running"
    }


@app.post("/predict")
def predict(data: HeartData):

    if model is None:
        raise HTTPException(
            status_code=500,
            detail="Model could not be loaded"
        )

    try:
        features = np.array([[
            data.age,
            data.sex,
            data.cp,
            data.trestbps,
            data.chol,
            data.fbs,
            data.restecg,
            data.thalach,
            data.exang,
            data.oldpeak,
            data.slope,
            data.ca,
            data.thal
        ]])

        prediction = model.predict(features)[0]

        if hasattr(model, "predict_proba"):
            probability = model.predict_proba(features)[0][1] * 100
        else:
            probability = float(prediction) * 100

        probability = round(float(probability), 2)

        if probability < 30:
            risk_category = "Low"
        elif probability < 70:
            risk_category = "Medium"
        else:
            risk_category = "High"

        return {
            "prediction": int(prediction),
            "probability": probability,
            "risk_category": risk_category
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )