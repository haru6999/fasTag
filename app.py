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
    return res.json({'a':'b'})

    

if __name__ == "__main__":
    app.run()
    port = int(os.getenv("PORT", 5000))
