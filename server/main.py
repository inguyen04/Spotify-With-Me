from flask import Flask, jsonify, request
import sqlite3 as sql


def create_app():
  app = Flask(__name__)


app = create_app



if __name__ == '__main__':
  app.run(debug=True)