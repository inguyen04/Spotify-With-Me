import os
from dotenv import load_dotenv
from flask import Flask
from supabase import create_client, Client


load_dotenv()

app = Flask(__name__)

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(os.getenv(SUPABASE_URL), SUPABASE_KEY)

@app.route('/create_review')
def get_data():
  data = supabase.table()