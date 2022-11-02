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
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Insert data into the table

cur.execute('INSERT INTO teams (name, headcoach, city, record)'
            'VALUES (%s, %s, %s, %s)',
            ('Saints',
             'Dennis Allen',
             'New Orleans',
             '3-5')
            )


cur.execute('INSERT INTO teams (name, headcoach, city, record)'
            'VALUES (%s, %s, %s, %s)',
            ('Cardinals',
             'Kliff Kingsbury',
             'Arizona',
             '3-5')
            )

conn.commit()

cur.close()
conn.close()
