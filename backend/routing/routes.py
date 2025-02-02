import os
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from supabase import create_client, Client
from flask_cors import CORS


load_dotenv()

routes = Blueprint("routes", __name__)


SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


if not SUPABASE_URL or not SUPABASE_KEY:
  raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY. Check .env file.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@routes.route('/receive-userid', methods=['POST'])
def receive_userid():
  try:
    data = request.get_json()
    user_id = data.get("profile_id")

    print("Received data:", data)

    response = supabase.table("users").insert({"user_id": user_id}).execute()

    return jsonify({"message": "User added successfuly", "response": response.data}), 201
  
  except Exception as e:
    print("Error:", str(e))
    return jsonify({"error": str(e)}), 500


@routes.route('/add-review', methods=['POST'])
def add_review():
  try:
    data = request.get_json()
    user_id = data.get("user_id")
    rating = data.get("rating")
    review = data.get("review")
    song = data.get("song")
    artist = data.get("artist")
    name = data.get("name")

    if not user_id or (rating is None and review is None):
      return jsonify({"error": "Missing required fields"}), 400
    
    response = supabase.table("reviews").insert({
      "user_id": user_id,
      "rating": rating,
      "review": review,
      "name": name,
      "song": song,
      "artist": artist
    }).execute()

    return jsonify({"message": "Review added successfully", "response": response.data}), 201
  
  except Exception as e:
    print("Error", str(e))
    return jsonify({"error": str(e)}), 500
  
@routes.route('/send-reviews/<user_id>', methods=['GET'])
def get_review(user_id):
  try:
    response = supabase.table("reviews").select("*").eq("user_id", user_id).execute()
    return jsonify({"reviews": response.data}), 200
  except Exception as e:
    return jsonify({"error": str(e)}), 500
