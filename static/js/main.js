function Send(dic) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4) { // 通信の完了時
      if (req.status == 200) { // 通信の成功時
        return req.responseText;
      }
    } else {
      console.log('connecting...')
    }
  }
  req.open('GET', 'helloAjax.php?msg="hello!"', true);
  req.send(null);
  return eval('(' + req.responseText + ')');;
}


document.addEventListener('click', function(e) {
  console.log(e)
  dic={
    'a':'b',
    'c':1,
  }
  console.log(dic)
})


/*35×*/
