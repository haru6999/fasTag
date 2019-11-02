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

// 35*50 でグリッド（1750分割）
