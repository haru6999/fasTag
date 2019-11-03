function Send(path, dic) {
  console.log("Sendに入った")
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    console.log("onreadystatechange入った");
    if (req.readyState == 4) { // 通信の完了時
      console.log("通信の完了時");
      if (req.status == 200) { // 通信の成功時
        console.log('done!')
        MakePin(eval("(" + req.responseText + ")"))
      }
    } else {
      console.log('connecting....')
      let gridX = Object.values(dic)[0];
      let gridY = Object.values(dic)[1];
      MakePin(gridX,gridY);
    }
  }
  
  console.log('x?',Object.values(dic[0]));
  console.log('y?',Object.values(dic[1]));

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
  // req.send(null);
}

// 画像のクリック場所取得
const elem = document.getElementById('bookIFrame');
const arrayX = [];
const arrayY = [];
let gridX = 35;
let gridY = 50;

function MakePin(x,y) {
  console.log('makepin入った',x,y)
  // let gridX = Object.values(dic[0]);
  // let gridY = Object.values(dic[1]);
  var element = document.getElementById( "cvs1" ) ;
  var ctx = element.getContext( "2d" ) ;
  ctx.beginPath () ;
  ctx.arc( arrayX[x], arrayY[y], 50, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
  ctx.fillStyle = "rgba(255,255,0,0.5)" ;
  ctx.fill() ;
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
  var book_id = params['book_id']
  console.log('page',page);
  console.log('book_id',book_id)
  document.getElementById('toNext').addEventListener('click', function () {
    page++;
    elem.contentWindow.document.getElementById('bookImage').src = "../png/" + book_id + "/" + page + ".png";
  }, false);

  document.getElementById('toPrev').addEventListener('click', function () {
    page--;
    if (page < 0) {
      page = 0
    }
    elem.contentWindow.document.getElementById('bookImage').src = "../png/" + book_id + "/" + page + ".png";
  }, false);

}, 1000)
