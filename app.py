import time
import os
from flask import *
app = Flask(__name__)

@app.route("/start")
def just_call():
    return 'connected'

@app.route("/", methods=["GET", "POST"])
def Main():
    return render_template("index.html")

@app.route("/api", methods=["GET"])
def api():
    time.sleep(1)
    print('ok')
    return jsonify({'a':'b'})
  

if __name__ == "__main__":
    app.run()
    port = int(os.getenv("PORT", 5000))
