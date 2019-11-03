import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from collections import OrderedDict
import pprint
import ast
import datetime

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
ID = 0
# ユーザ登録用
def UserRegistration(name, age, genre, ID):
    userBookIDList = []
    doc_ref = db.collection(u'users').document(ID)
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

    data = '{"' + collection + '":{'
    count = 0
    for doc in docs:
        if count == 0:
            data = data + u'"{}":{}'.format(doc.id, doc.to_dict())
        else:
            data = data + u',"{}":{}'.format(doc.id, doc.to_dict())
        count += 1
    
    data = data + "}}"

    # print(data)
    return json.dumps(ast.literal_eval(data))

# bookIDによるtag検索
def tagSearch(bookID):
    data = Reading(u'books')
    data = json.loads(data)
    return data["books"][bookID]["tagAll"]


def MakeBooksTagAllData(userID, tagData, oldTagAll):
    tagData["user"] = userID
    oldTagAll.append(tagData)
    return oldTagAll

# tagの登録用
def RegistrationTag(userID, bookID, tagID, tagData):
    userBookID = userID + bookID
    # print(userBookID)
    Registration(userBookID, str(tagID), tagData)
    newData = MakeBooksTagAllData(userID, tagData, tagSearch(bookID))
    Update("books", bookID, "tagAll", newData)
    now = datetime.datetime.now()
    strNow = now.strftime("%Y/%m/%d %H:%M:%S")
    Update("books", bookID, "updateTime", strNow)
    return tagID + 1


def GetTagAllNum(tagAll):
    return len(ast.literal_eval(tagAll))

# [id,bookName,tagAllの数,tag]
def SearchBook(word):
    users_ref = db.collection('books').order_by("popularity", direction=firestore.Query.DESCENDING)
    docs = users_ref.stream()
    result = []
    count = 0
    for doc in docs:
        data = ast.literal_eval(u'{}'.format(doc.to_dict()))
        ID = u"{}".format(doc.id)
        tagAllNum =len(data["tagAll"])

        if word == data["author"]:
            result.insert(count, [ID, data["bookName"], tagAllNum, data["attribute"]])
            count += 1
        elif word == data["bookName"]:
            result.insert(count, [ID, data["bookName"], tagAllNum, data["attribute"]])
            count += 1
        elif word in data["author"]:
            result.append([ID, data["bookName"], tagAllNum, data["attribute"]])
        elif word in data["bookName"]:
            result.append([ID, data["bookName"], tagAllNum, data["attribute"]])
    return result



def DefaultValue():
    users_ref = db.collection('books').order_by("updateTime", direction=firestore.Query.DESCENDING)
    docs = users_ref.stream()
    result = []
    count = 0
    for doc in docs:
        data = u'{}'.format(doc.to_dict())
        data = ast.literal_eval(data)
        ID = u"{}".format(doc.id)
        tagAllNum = len(data["tagAll"])
        print(data["tagAll"])
        print()
        result.append([ID, data["bookName"], tagAllNum, data["attribute"]])
        count += 1
    
    return result

def Count(collection):
    users_ref = db.collection(collection)
    docs = users_ref.stream()
    count = 0
    for doc in docs:
        count += 1

    return count


#data = {"tagInfo": "he", "x": "22", "y": "19", "page": "memo", "attribute": "memo"}
#RegistrationTag(u"000000001", u"000000001", 1, data)