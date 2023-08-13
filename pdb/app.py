from datetime import datetime
from urllib.parse import quote_plus, urlencode
from flask import Flask, redirect, render_template, session, url_for, jsonify, request
# from hotkey_tv.util import *


app = Flask(__name__)


@app.route('/')
def home():
    now = datetime.now()
    return render_template('index.html', now=now)

if __name__ == '__main__':
    app.run()


