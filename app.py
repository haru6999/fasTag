import os
from flask import *
app = Flask(__name__)

@app.route("/start")
def just_call():
    return 'connected'

@app.route("/", methods=["GET", "POST"])
def Main():
    return render_template("index.html")
    """
    if request.method == "GET":
        return render_template("index.html")
    else:
        age=request.form['age']
        return render_template("result.html",age=age)
    """

if __name__ == "__main__":
    app.run()
    port = int(os.getenv("PORT", 5000))
