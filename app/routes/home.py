from flask import render_template, request
from app import app
from  ..ml_model import inference


@app.route("/", methods = ['GET'])
def home():
    return render_template('index.html')

@app.route("/predict", methods = ['POST'])
def predict():
    model = inference.load()
    diagonosis_result = inference.predict(request.form,model)
    return {
        'result' : diagonosis_result
    }