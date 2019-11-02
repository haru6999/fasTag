function Send(path, dic) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == 4) { // 通信の完了時
      if (req.status == 200) { // 通信の成功時
        console.log('done!')
        MakePin(eval("(" + req.responseText + ")"))
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
  // req.send(null);
}


function MakePin(res) {
  console.log(res)
}

// // iframeのDOMを取得
// console.log(elem.contentWindow.document);

// // iframe内のDOMを操作
// btn.addEventListener('click', function(){
//  target.innerHTML = 'iframeの外のボタンが<br>クリックされました！！';
//  target.style.background="red";
// });


// 画像のクリック場所取得
const elem = document.getElementById('bookIFrame');

setTimeout(() => {
  console.log('ok')
  var bookImage = elem.contentWindow.document.getElementById('bookImage');
  console.log("aa");
  console.log(bookImage);


  let target = bookImage
  let elementX = bookImage.clientWidth; //要素の横幅
  let elementY = bookImage.clientHeight; //要素の縦幅
  const arrayX = [];
  const arrayY = [];
  let gridX = 35;
  let gridY = 50;

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
    Send('push', { "x": gridArrayX, "y": gridArrayY, "tagInfo": "hello", "attribute": "memo", "page": 0, "user_id": "000000000", "book_id": "000000000" })

  });

}, 1000)
// 画像移動
var page = 0; //ページ
document.getElementById('toNext').addEventListener('click', function () {
  var srcName = "../png/01/" + page + ".png";
  page ++ ;
  console.log(srcName);
  elem.contentWindow.document.getElementById('bookImage').src = srcName ;
}, false);
