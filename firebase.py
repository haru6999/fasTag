import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from collections import OrderedDict
import pprint

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
ID = 0
# ユーザ登録用
def UserRegistration(name, age, genre, ID):
    userBookIDList = []
    doc_ref = db.collection(u'users').document(str(ID))
    doc_ref.set({
        u'name': name,
        u'age': age,
        u'genre': genre,
        u'userBookID': userBookIDList
    })
# データアップデート用
def Update(collection, document, field, data):
    updates = {}
    updates[field] = data
    doc_ref = db.collection(collection).document(document)
    doc_ref.update(updates)

# 登録用関数
def Registration(collection, document, field):
    doc_ref = db.collection(collection).document(document)
    doc_ref.set(field)

# 取り出し用関数(返り値json）
def Reading(collection):
    users_ref = db.collection(collection)
    docs = users_ref.stream()

    data = "{" + collection + ":{"
    count = 0
    for doc in docs:
        if count == 0:
            data = data + u'{}:{}'.format(doc.id, doc.to_dict())
        else:
            data = data + u',{}:{}'.format(doc.id, doc.to_dict())
        count += 1
    
    data = data + "}}"

    return json.dumps(data)

def Count(collection):
    users_ref = db.collection(collection)
    return len(["_" for _ in users_ref.stream()])


#print(Reading('users'))

