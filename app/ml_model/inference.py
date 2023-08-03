import pickle
import pandas as pd
import numpy as np

def load():
    path = "app/ml_model/model.pickle"
    with open(path , 'rb') as f:
        model = pickle.load(f)
    return model

def predict(request , model):
    X = []
    fourteen_age_cat = 0
    if(18 <= float(request['umur']) <= 24):
        fourteen_age_cat = 1
    elif(25 <= float(request['umur']) <= 29):
        fourteen_age_cat = 2
    elif(30 <= float(request['umur']) <= 34):
        fourteen_age_cat = 3
    elif(35 <= float(request['umur']) <= 39):
        fourteen_age_cat = 4
    elif(40 <= float(request['umur']) <= 44):
        fourteen_age_cat = 5
    elif(45 <= float(request['umur']) <= 49):
        fourteen_age_cat = 6
    elif(50 <= float(request['umur']) <= 54):
        fourteen_age_cat = 7
    elif(55 <= float(request['umur']) <= 59):
        fourteen_age_cat = 8
    elif(60 <= float(request['umur']) <= 64):
        fourteen_age_cat = 9
    elif(65 <= float(request['umur']) <= 69):
        fourteen_age_cat = 10
    elif(70 <= float(request['umur']) <= 74):
        fourteen_age_cat = 11
    elif(75 <= float(request['umur']) <= 79):
        fourteen_age_cat = 12
    else:
        fourteen_age_cat = 13


    condition = {
        'high_bp' : float(request['high-blood']),
        'high_chol' : float(request['choresterol']),
        'body_mass_idx' : float(request['berat-badan'])/(((float(request['tinggi-badan']))/100)**2),
        'smoker' : float(request['smoker']),
        'stroke' : float(request['stroke']),
        'diabetes' : float(request['diabetes']),
        'physc_actv' : float(request['phys-activity']),
        'fruits' : float(request['fruit']),
        'veggan' : float(request['veggan']),
        'gen_hlt' : float(request['gen-hlth']),
        'mental_hlt' : float(request['mental-hlt']),
        'physc_hlt' : float(request['physc-hlt']),
        'diff_walk' : float(request['diff-walk']),
        'age' : fourteen_age_cat,
        'female' : 1 if request['sex'] == 'Perempuan' else 0,
        'male' : 1 if request['sex'] == 'Laki-laki' else 0
    }


    # predict
    for key in (condition.keys()):
        X.append(condition[key])
    
    result = model.predict(np.array(X).reshape(1,-1))[0]

    return result



