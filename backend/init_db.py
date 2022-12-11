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
                                 'team varchar (150) NOT NULL,'
                                 'chmp int,'
                                 'ap1 int,'
                                 'pb int,'
                                 'from int,'
                                 'to int,'
                                 'g int,'
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








# ----------------------------------- Insert Teams -----------------------------------
cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Chiefs',
             '1',
             'Kansas City',
             '17-21',
             '1',
             'Kansas City Municipal Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Saints',
             '2',
             'New Orleans',
             '10-13',
             '2',
             'Tiger Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Packers',
             '3',
             'Green Bay',
             '36-25',
             '3',
             'Milwaukee County Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Buccaneers',
             '4',
             'Tampa Bay',
             '11-10',
             '4',
             'Houlihan\'s Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Steelers',
             '5',
             'Pittsburgh',
             '36-27',
             '5',
             'Three Rivers Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Bears',
             '6',
             'Chicago',
             '17-20',
             '6',
             'Memorial Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Seahawks',
             '7',
             'Seattle',
             '10-13',
             '7',
             'Husky Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('49ers',
             '8',
             'San Francisco',
             '35-23',
             '8',
             'Candlestick Park')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Broncos',
             '9',
             'Denver',
             '23-19',
             '9',
             'Mile High Stadium')
            )


cur.execute('INSERT INTO teams (name, coachId, city, record, stadiumId, prevName)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Cardinals',
             '10',
             'Arizona',
             '7-10',
             '10',
             'University of Phoenix',)
            )    


# ----------------------------------- Insert Players -----------------------------------

cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Trent McDuffie',
             '1',
             'September 13, 2000',
             '22',
             '5-11',
             '195lb',
             'DB',
             'Washington',)
            )    




# ----------------------------------- Insert Coaches -----------------------------------











# Insert data into the table
cur.execute('INSERT INTO stats (pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s)',
            (21,
             12)
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
