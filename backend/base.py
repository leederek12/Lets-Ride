import os
import psycopg2
from flask import Flask, render_template, request, url_for, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask_db',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD'])
    return conn


@app.route('/teams')
def index():
    if request.method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM teams;')
        teams = cur.fetchall()
        cur.close()
        conn.close()
        return teams

@app.route('/add-team', methods=['GET', 'POST'])
def add_team():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO teams (name, headcoach, city, record, stadium, prevName) VALUES (%s, %s, %s, %s, %s, %s)",
                    (f"{data['name']}", f"{data['city']}", f"{data['coach']}", f"{data['record']}", f"{data['stadium']}", f"{data['prevName']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed'   

@app.route('/update-team', methods=['GET', 'POST'])
def add_team():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("UPDATE teams SET name=%s, headcoach=%s, city=%s, record=%s, stadium=%s, prevName=%s WHERE id=%s",
                    (f"{data['name']}", f"{data['city']}", f"{data['coach']}", f"{data['record']}", f"{data['stadium']}", f"{data['prevName']}", f"{data['id']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed'  

@app.route('/add-players', methods=['GET', 'POST'])
def add_team():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO players (name, birthmonth, birthdate, birthyear, age, height, weight, position, college) VALUES (%s, %d, %d, %d, %d, %s, %s, %s, %s)",
                    (f"{data['name']}", f"{data['birthmonth']}", f"{data['birthdate']}",f"{data['birthyear']}", f"{data['age']}", f"{data['weight']}", f"{data['position']}", f"{data['college']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed'  

@app.route('/add-game', methods=['GET', 'POST'])
def add_team():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO game (date, team1, team2, teamscore1, teamscore2, stadium) VALUES (%s, %s, %s, %s, %s)",
                    (f"{data['date']}", f"{data['team1']}", f"{data['team2']}", f"{data['stadium']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed' 

@app.route('/add-stadium', methods=['GET', 'POST'])
def add_team():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO stadium (name) VALUES (%s)",
                    (f"{data['name']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed' 