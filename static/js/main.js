function Send(dic) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == 4) { // 通信の完了時
      if (req.status == 200) { // 通信の成功時
        console.log('done!')
        Get(eval("("+req.responseText+")"))
      }
    } else {
      console.log('connecting....')
    }
  }

  keys = Object.keys(dic)
  vals = Object.values(dic)
  for (i = 0; i < keys.length; i++) {
    if (i) {
      output += "&"
    }
    output = "" + keys[i] + "=" + vals[i]
  }
  req.open('GET', '/api?' + output, true);
  req.send(null);
}

document.addEventListener('click', function () {
  dic = {
    'a': 'b',
    'c': 1,
  }
  Send(dic)
})

function Get(res){
  console.log(res)

  return res
}

// 画像のクリック場所取得
let target = document.getElementById('book');
let elementX = document.getElementById('book').clientWidth; //要素の横幅
let elementY = document.getElementById('book').clientHeight; //要素の縦幅
const arrayX = [];
const arrayY = [];
let gridX = 35;
let gridY = 50;

for (var i = 0; i < gridX; i++) {
  arrayX[i] = elementX / gridX * (i+1);
}
for (var j = 0; j < gridY; j++) {
  arrayY[j] = elementY / gridY * (j+1);
}

target.addEventListener('click', function(e){
  let targetX = e.offsetX;
  let targetY = e.offsetY;
  let gridArrayX = 0;
  let gridArrayY = 0;
  // console.log(targetX,targetY);
  // console.log(elementX,elementY);
  for (var i = 0; i < gridX; i++) {
    if(targetX >= arrayX[i]){
      gridArrayX ++;
    }
  }
  for (var i = 0; i < gridY; i++) {
    if(targetY >= arrayY[i]){
      gridArrayY ++;
    }
  }
  console.log(gridArrayX,gridArrayY); //gridでの場所
});
