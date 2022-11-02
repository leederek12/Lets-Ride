import os
import psycopg2
from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask_db',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD'])
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM teams;')
    teams = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', teams=teams)