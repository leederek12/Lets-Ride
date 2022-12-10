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
def teams():
    if request.method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM teams;')
        teams = cur.fetchall()
        cur.close()
        conn.close()
        return teams

@app.route('/games')
def games():
    if request.method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM games;')
        games = cur.fetchall()
        cur.close()
        conn.close()
        return games

@app.route('/stadiums')
def stadiums():
    if request.method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM stadiums;')
        stadiums = cur.fetchall()
        cur.close()
        conn.close()
        return stadiums

@app.route('/stats')
def stats():
    if request.method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM stats;')
        stats = cur.fetchall()
        cur.close()
        conn.close()
        return stats

@app.route('/coaches')
def coaches():
    if request.method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM stats;')
        coaches = cur.fetchall()
        cur.close()
        conn.close()
        return coaches

@app.route('/players')
def players():
    if request.method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM players;')
        players = cur.fetchall()
        cur.close()
        conn.close()
        return players

@app.route('/add-team', methods=['GET', 'POST'])
def add_team():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO teams (name, coachId, city, record, stadiumId, prevName) VALUES (%s, %s, %s, %s, %s, %s)",
                    (f"{data['name']}", f"{data['city']}", f"{data['coach']}", f"{data['record']}", f"{data['stadium']}", f"{data['prevName']}"))
        cur.execute("INSERT INTO stats (pointsAllowedPerGame, pointsPerGame) VALUES (%s, %s)",
                    (f"{data['pointsAllowedPerGame']}", f"{data['pointsPerGame']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed'   

@app.route('/update-team', methods=['GET', 'POST'])
def update_team():
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
def add_player():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO players (name, teamId, birthday, age, height, weight, position, college) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                    (f"{data['name']}", f"{data['teamId']}", f"{data['birthday']}", f"{data['age']}", f"{data['height']}", f"{data['weight']}", f"{data['position']}", f"{data['college']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed'  

@app.route('/add-game', methods=['GET', 'POST'])
def add_game():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO games (date, team1, team2, teamscore1, teamscore2) VALUES (%s, %s, %s, %s, %s)",
                    (f"{data['date']}", f"{data['team1']}", f"{data['team2']}", f"{data['teamscore1']}", f"{data['teamscore2']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed' 

@app.route('/add-stadium', methods=['GET', 'POST'])
def add_stadium():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        data = request.form.to_dict()
        print(data)
        cur.execute("INSERT INTO stadiums (name, city, owner) VALUES (%s, %s, %s)",
                    (f"{data['name']}", f"{data['city']}", f"{data['owner']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed' 