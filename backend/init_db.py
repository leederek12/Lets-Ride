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
                                 'height varchar (150) NOT NULL,'
                                 'weight varchar (150) NOT NULL,'
                                 'position varchar (150) NOT NULL,'
                                 'college varchar (150) NOT NULL,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )
"""
cur.execute('CREATE TABLE players (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'teamId int,'
                                 'birthday varchar (150) NOT NULL,'
                                 'age int,'
                                 'height varchar (150) NOT NULL,'
                                 'weight varchar (150) NOT NULL,'
                                 'position varchar (150) NOT NULL,'
                                 'college varchar (150) NOT NULL,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )
"""

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
                                'teamName varchar (150) NOT NULL,'
                                 'pointsAllowedPerGame int,'
                                 'pointsPerGame int,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# predictions
# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS predictions;')
cur.execute('CREATE TABLE predictions (statsId serial PRIMARY KEY,'
                                 'team1 varchar (150) NOT NULL,'
                                 'team2 varchar (150) NOT NULL,'
                                 'teamScore1 int,'
                                 'teamScore2 int);'
                                 )


# ----------------------------------- Stored Procedure ------------------------------
cur.execute('DROP PROCEDURE IF EXISTS createProjection;')
cur.execute('create or replace procedure createProjection('
                'teamName1 varchar(150),'
                'teamName2 varchar(150))' 
                'language plpgsql '    
                'as $$ '
                'begin '
                'update predictions ' 
                'set teamScore1 = (t2.pointsAllowedPerGame + t1.pointsPerGame)/2 ' 
                'from stats t1, stats t2 '
                'where t1.teamName = teamName1 AND t2.teamName = teamName2 AND predictions.team1 = teamName1 AND predictions.team2 = teamName2; '

                'update predictions '
                'set teamScore2 = (t1.pointsAllowedPerGame + t2.pointsPerGame)/2 ' 
                'from stats t1, stats t2 '
                'where t1.teamName = teamName1 AND t2.teamName = teamName2 AND predictions.team1 = teamName1 AND predictions.team2 = teamName2; '
                'commit; '
                'return; '
                'end; $$')


# ----------------------------------- Stored Procedure ------------------------------
cur.execute('DROP PROCEDURE IF EXISTS createProjectionInjuries;')
cur.execute('create or replace procedure createProjectionInjuries('
                'teamName1 varchar(150),'
                'teamName2 varchar(150),'
                'injuries1 varchar(150),'
                'injuries2 varchar(150))' 
                'language plpgsql '    
                'as $$ '
                'begin '
                'update predictions ' 
                'set teamScore1 = (t2.pointsAllowedPerGame + t1.pointsPerGame)/2 *(1-(injuries1:: DOUBLE PRECISION)) ' 
                'from stats t1, stats t2 '
                'where t1.teamName = teamName1 AND t2.teamName = teamName2 AND predictions.team1 = teamName1 AND predictions.team2 = teamName2; '

                'update predictions '
                'set teamScore2 = (t1.pointsAllowedPerGame + t2.pointsPerGame)/2 *(1-(injuries2:: DOUBLE PRECISION))' 
                'from stats t1, stats t2 '
                'where t1.teamName = teamName1 AND t2.teamName = teamName2 AND predictions.team1 = teamName1 AND predictions.team2 = teamName2; '
                'commit; '
                'return; '
                'end; $$')




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
             'University of Phoenix')
            )    


# ----------------------------------- Insert Coaches -----------------------------------

cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Andy Reid',
             'BYU')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Dennis Allen',
             'Texas A&M')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Matt LaFleur',
             'Saginaw Valley St.')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Todd Bowles',
             'Temple')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Mike Tomlin',
             'William & Mary')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Matt Eberflus',
             'Toledo')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Pete Carroll',
             'Pacific')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Kyle Shanahan',
             'Duke')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Nathaniel Hackett',
             'UC Davis')
            )    


cur.execute('INSERT INTO coaches (name, almaMater)'
            'VALUES (%s, %s)',
            ('Kliff Kingsbury',
             'Texas Tech')
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
             'Washington')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('George Karlaftis III',
             '1',
             'April 3, 2001',
             '21',
             '6-4',
             '275lb ',
             'DE',
             'Purdue')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Skyy Moore',
             '1',
             'September 10, 2000',
             '22',
             '5-10',
             '195lb',
             'WR',
             'Western Michigan')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Bryan Cook',
             '1',
             'September 7, 1999',
             '23',
             '6-1',
             '210lb',
             'S',
             'Howard')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Leo Chenal',
             '1',
             'October 26, 2000',
             '22',
             '6-2',
             '255lb',
             'LB',
             'Wisconsin')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Joshua Williams',
             '1',
             'October 17, 1999',
             '23',
             '6-3',
             '197lb',
             'CB',
             'Fayetteville St.')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Darian Kinnard',
             '1',
             'December 29, 1999',
             '22',
             '6-5',
             '345lb',
             'T',
             'Kentucky')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Jaylen Watson',
             '1',
             'September 17, 1998',
             '24',
             '6-3',
             '204lb',
             'DB',
             'Washington St.')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Isiah Pacheco',
             '1',
             'March 2, 2000',
             '22',
             '5-11',
             '215lb',
             'RB',
             'Rutgers')
            )    


cur.execute('INSERT INTO players (name, teamId, birthday, age, height, weight, position, college)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            ('Nazeeh Johnson',
             '1',
             'July 17, 1998',
             '24',
             '6-2',
             '189lb',
             'S',
             'Marshall')
            )    

# ----------------------------------- Insert Games -----------------------------------

cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Dec 5, 2022',
             '2',
             '4',
             '16',
             '17')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Dec 4, 2022',
             '3',
             '6',
             '28',
             '19')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Nov 27, 2022',
             '2',
             '8',
             '0',
             '13')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Nov 21, 2022',
             '8',
             '10',
             '38',
             '10')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Nov 13, 2022',
             '7',
             '4',
             '16',
             '21')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Nov 6, 2022',
             '7',
             '10',
             '31',
             '21')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Oct 23, 2022',
             '1',
             '8',
             '44',
             '23')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Oct 2, 2022',
             '1',
             '4',
             '41',
             '31')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Sep 25, 2022',
             '8',
             '9',
             '10',
             '11')
            )    


cur.execute('INSERT INTO games (date, team1, team2, teamscore1, teamscore2)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('Sep 12, 2022',
             '9',
             '7',
             '16',
             '17')
            )    

# ----------------------------------- Insert Games -----------------------------------

cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Arrowhead Stadium',
             'Kansas City, MO',
             'Jackson County Sports Complex Authority')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Caesars Superdome',
             'New Orleans, LA',
             'The Louisiana Stadium and Exposition District')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Lambeau Field',
             'Green Bay, WI',
             'Green Bay/Brown County Professional Football Stadium District')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Raymond James Stadium',
             'Tampa, FL',
             'Hillsborough County')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Acrisure Stadium',
             'Pittsburgh, PA',
             'Sports & Exhibition Authority of Pittsburgh and Allegheny County')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Soldier Field',
             'Chicago, IL',
             'Burnham Park')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Lumen Field',
             'Seattle, WA',
             'Washington State Public Stadium Authority')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Levi\'s Stadium',
             'Santa Clara, CA',
             'City of Santa Clara')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('Empower Field at Mile High',
             'Denver, CO',
             'Denver Metropolitan Football Stadium District')
            )    

            
cur.execute('INSERT INTO stadiums (name, city, owner)'
            'VALUES (%s, %s, %s)',
            ('State Farm Stadium',
             'Glendale, AZ',
             'Arizona Sports and Tourism Authority')
            )    


# ----------------------------------- Insert Stats -----------------------------------

cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Chiefs', 
            '27',
             '35')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Saints',
            '29',
             '26')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Packers',
            '30',
             '26')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Buccaneers',
            '27',
             '21')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Steelers',
            '33',
             '27')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Bears',
            '30',
             '31')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Seahawks',
            '19',
             '28')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('49ers',
            '20',
             '16')
            )


cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Broncos',
            '32',
             '26')
            )

cur.execute('INSERT INTO stats (teamName, pointsAllowedPerGame, pointsPerGame)'
            'VALUES (%s, %s, %s)',
            ('Cardinals', '21',
             '21')
            )

# ----------------------------------- Insert Predictions -----------------------------------

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Chiefs',
                'Saints',
                '27',
                '14'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Saints',
                'Buccaneers',
                '17',
                '13'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Packers',
                'Bears',
                '20',
                '17'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Buccaneers',
                '49ers',
                '28',
                '17'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Steelers',
                'Cardinals',
                '23',
                '20'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Bears',
                'Saints',
                '24',
                '20'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Seahawks',
                'Buccaneers',
                '31',
                '20'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('49ers',
                'Bears',
                '34',
                '28'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Broncos',
                '49ers',
                '24',
                '10'))

cur.execute('INSERT INTO predictions (team1, team2, teamscore1, teamscore2)'
                'VALUES (%s, %s, %s, %s)',
                ('Cardinals',
                'Seahawks',
                '28',
                '24'))

conn.commit()

cur.close()
conn.close()
