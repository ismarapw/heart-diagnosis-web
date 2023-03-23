from flask import render_template, request
from heartdiseasepredict import app
from .model import model


@app.route("/", methods = ['GET', 'POST'])
def home():
    form = {}
    if(request.method == "POST"):
        diagonosis_msg = ''
        form = request.form
        predictor_model = model.load()
        diagonosis_result = model.predict(
            form,
            predictor_model
        )

        if(diagonosis_result == 1):
            diagonosis_msg = ' Mungkin anda terkena penyakit jantung' 
        else:
            diagonosis_msg = "Anda mungkin sehat-sehat saja, stay healthy :)" 
        
        return render_template('result.html', value = diagonosis_msg)  

    return render_template('main.html', form = form)   