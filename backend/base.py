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
        cur.execute("INSERT INTO teams (name, headcoach, city, record, stadium, prevName) VALUES (%s, %s, %s, %s, %s, %s))",
                    (f"{data['name']}", f"{data['coach']}", f"{data['city']}", f"{data['record']}", f"{data['stadium']}", f"{data['prevName']}"))
        conn.commit()
        return 'Form submitted'
    else:
        return 'Form submission failed'    