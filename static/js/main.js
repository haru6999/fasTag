function Send(path, dic) {
  console.log("Sendに入った")
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    console.log("onreadystatechange入った");
    if (req.readyState == 4) { // 通信の完了時
      console.log('done!')
      res=eval('('+req.responseText+')')
      if (req.status == 200) { // 通信の成功時
        if(path=="get-message"){
          for(i=0;i<res.length;i++){
            res[i]=eval('('+res[i]+')')
          }
          output=[]
          for(i=0;i<res.length;i++){
            if(res[i]["page"]==""+dic['page']){
              output.push(res[i])
            }
          }
          MakePin(output)
          //メモ：output[0]={"user":"0000000000","tagInfo": "ここにコメント１", "x": "22", "y": "18", "page": "3", "attribute": "memo"}
        }
        if(path=="push"){
          MakePin([res])
        }
      }
    } else {
      console.log('connecting....')
    }
  }
  keys = Object.keys(dic)
  vals = Object.values(dic)
  output = ""
  for (i = 0; i < keys.length; i++) {
    if (i) {
      output += "&"
    }
    output += "" + keys[i] + "=" + vals[i]
  }
  req.open('GET', '/' + path + '?' + output, true);
  console.log('output',output);
  req.send(null);
}

// 画像のクリック場所取得
const elem = document.getElementById('bookIFrame');
const arrayX = [];
const arrayY = [];
let gridX = 35;
let gridY = 50;

function MakePin(lst) {
  console.log(lst)

}

setTimeout(() => {
  console.log('setTimeout入った')
  var bookImage = elem.contentWindow.document.getElementById('bookImage');
  let target = bookImage;
  let elementX = bookImage.clientWidth; //要素の横幅
  let elementY = bookImage.clientHeight; //要素の縦幅

  for (var i = 0; i < gridX; i++) {
    arrayX[i] = elementX / gridX * (i + 1);
  }
  for (var j = 0; j < gridY; j++) {
    arrayY[j] = elementY / gridY * (j + 1);
  }

  target.addEventListener('click', function (e) {
    let targetX = e.offsetX;
    let targetY = e.offsetY;
    let gridArrayX = 0;
    let gridArrayY = 0;
    for (var i = 0; i < gridX; i++) {
      if (targetX >= arrayX[i]) {
        gridArrayX++;
      }
    }
    for (var i = 0; i < gridY; i++) {
      if (targetY >= arrayY[i]) {
        gridArrayY++;
      }
    }
    console.log(gridArrayX,gridArrayY);
    
    //ここにコメントを書き込む処理
    Send('push', { "x": gridArrayX, "y": gridArrayY, "tagInfo": "hello", "attribute": "memo", "page": 0, "user_id": "000000000", "book_id": "000000000" })
  });

  // 画像移動
  params = {};
  try {
    (location.href.split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
  } catch (e) {
    console.log(e)
  }
  var page = params['page']; //ページ
  var book_id = params['id']
  console.log('page',page);
  console.log('book_id',book_id)
  document.getElementById('toNext').addEventListener('click', function () {
    page++;
    elem.contentWindow.document.getElementById('bookImage').src = "../png/" + book_id + "/" + page + ".png";
    Send('get-message',{'id':book_id,"page":page})
  }, false);

  document.getElementById('toPrev').addEventListener('click', function () {
    page--;
    if (page < 0) {
      page = 0
    }
    elem.contentWindow.document.getElementById('bookImage').src = "../png/" + book_id + "/" + page + ".png";
    Send('get-message',{'id':book_id,"page":page})
  }, false);

}, 1000)
