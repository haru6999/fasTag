import firebase as fb
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

@app.route("/page", methods=["GET", "POST"])
def page():
    return render_template("page.html")
@app.route("/get-book", methods=["GET"])
def getbook():
    book_id=request.args.get('id')
    page_num=request.args.get('page')
    return redirect('/page?id='+book_id+'&page='+str(page_num))


    
@app.route("/push", methods=["GET"])
def push():
    args=request.args
    field={
        "x":args.get('x'),
        "y":args.get('y'),
        "tagInfo":args.get('tagInfo'),
        "attribute":args.get('attribute'),
        "page":args.get('page'),
        "user":args.get('user_id')
    }
    user_book_id=args.get('user_id')+args.get('book_id')
    fb.Registration(user_book_id,str(fb.Count(user_book_id)),field)

    return json.dumps(field)
  

@app.route("/get-message", methods=["GET"])
def get():
    args=request.args
    res=fb.tagSearch(args.get('id'))
    return jsonify(res)




if __name__ == "__main__":
    app.run()
    port = int(os.getenv("PORT", 5000))
