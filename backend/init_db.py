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
                                 'coachId int,'
                                 'city varchar (150) NOT NULL,'
                                 'record text,'
                                 'stadiumId int,'
                                 'prevName varchar,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS coaches;')
cur.execute('CREATE TABLE coaches (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'almaMater varchar,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# players
# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS players;')
cur.execute('CREATE TABLE players (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'teamId int,'
                                 'birthday varchar (150) NOT NULL,'
                                 'age int,'
                                 'height int,'
                                 'weight int,'
                                 'position varchar (150) NOT NULL,'
                                 'college varchar (150) NOT NULL,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# games
# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS games;')
cur.execute('CREATE TABLE games (id serial PRIMARY KEY,'
                                 'date varchar (150) NOT NULL,'
                                 'team1 varchar (150) NOT NULL,'
                                 'team2 varchar (150) NOT NULL,'
                                 'teamscore1 int,'
                                 'teamscore2 int,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# stadium
# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS stadiums;')
cur.execute('CREATE TABLE stadiums (stadiumId serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'city varchar (150) NOT NULL,'
                                 'owner varchar (150) NOT NULL,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# stats
# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS stats;')
cur.execute('CREATE TABLE stats (statsId serial PRIMARY KEY,'
                                 'pointsAllowedPerGame int,'
                                 'pointsPerGame int,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )



# Insert data into the table
cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Saints',
             '1',
             'New Orleans',
             '3-5',
             '1',
             'Super Dome')
            )

# Insert data into the table
cur.execute('INSERT INTO stats (pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s)',
            (21,
             12)
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Cardinals',
             '1',
             'Arizona',
             '3-5',
             '1',
             'University of Phoenix',)
            )    

# Insert data into the table
cur.execute('INSERT INTO stats (pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s)',
            (20,
             26.6)
            )

conn.commit()

cur.close()
conn.close()
