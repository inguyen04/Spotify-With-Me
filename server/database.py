
import sqlite3
from flask import current_app, g

conn = sqlite3.connect("spotify_data.db")
cursor = conn.cursor()


cursor.execute('''
CREATE TABLE IF NOT EXISTS tracks (
    user_id TEXT PRIMARY KEY,
    name TEXT,
    artist TEXT,
    album TEXT,
    release_date TEXT,
    popularity INTEGER
)
''')

conn.commit()
conn.close()