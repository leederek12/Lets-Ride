import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="flask_db",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS teams;')
cur.execute('CREATE TABLE teams (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'headcoach varchar (50) NOT NULL,'
                                 'city varchar (150) NOT NULL,'
                                 'record text,'
                                 'stadiumId varchar (150) NOT NULL,'
                                 'prevName varchar,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS players;')
cur.execute('CREATE TABLE teams (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'birthmonth int,'
                                 'birthdate int,'
                                 'birthyear int,'
                                 'age int,'
                                 'height int,'
                                 'weight int',
                                 'position varchar (150) NOT NULL',
                                 'college varchar (150) NOT NULL',
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS games;')
cur.execute('CREATE TABLE teams (id serial PRIMARY KEY,'
                                 'date varchar (150) NOT NULL,'
                                 'team1 varchar (150) NOT NULL,'
                                 'team2 varchar (150) NOT NULL,'
                                 'teamscore1 int,'
                                 'teamscore2 int,'
                                 'stadiumId int,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS stadium;')
cur.execute('CREATE TABLE stadium (stadiumId serial PRIMARY KEY,'
                                 'stadiumName varchar (150) NOT NULL,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS game;')
cur.execute('CREATE TABLE teams (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'birthmonth int,'
                                 'birthdate int,'
                                 'birthyear int,'
                                 'age int,'
                                 'height varchar (150) NOT NULL,'
                                 'weight varchar (150) NOT NULL',
                                 'position varchar (150) NOT NULL',
                                 'college varchar (150) NOT NULL);'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Insert data into the table

cur.execute('INSERT INTO teams (name, headcoach, city, record, stadium, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Saints',
             'Dennis Allen',
             'New Orleans',
             '3-5',
             'CesearDome',
             'Super Dome')
            )


cur.execute('INSERT INTO teams (name, headcoach, city, record, stadium, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Cardinals',
             'Kliff Kingsbury',
             'Arizona',
             '3-5',
             'State Farm Stadium',
             'University of Phoenix',)
            )    

conn.commit()

cur.close()
conn.close()
