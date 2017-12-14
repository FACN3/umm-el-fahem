console.log(document.cookie);

var modal = document.getElementById('modal');
var btn = document.getElementById("login");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "flex";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



function displayPosts(arr) {
  console.log('arr:', arr);
  var container = document.getElementById('container');
  arr.forEach(function(post) {
    var div = document.createElement('div');
    var title = document.createElement('h2');
    title.textContent = post.title;
    var content = document.createElement('p');
    content.textContent = post.content;
    var author = document.createElement('span');
    div.appendChild(title);
    div.appendChild(content);
    div.classList.add('div--article');
    container.appendChild(div);
  });
}

(function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      displayPosts(JSON.parse(xhr.responseText));
    }
  };

  xhr.open("GET", '/posts');
  xhr.send();
})()
