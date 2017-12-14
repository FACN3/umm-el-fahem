var modal = document.getElementById('modal');
var btn = document.getElementById("login");
var span = document.getElementsByClassName("close")[0];
var articleBtn = document.getElementById('article_button');
if (document.cookie) {
  btn.value = JSON.parse(document.cookie.split('user=')[1].split("}.")[0] + "}").name;
  articleBtn.style.display = "flex";
}

articleBtn.onclick = function() {
  if (articleBtn.textContent === "Add new article") {
    document.getElementsByClassName('div--post')[0].style.display = "flex";
    articleBtn.textContent = 'Close';
  } else {
    document.getElementsByClassName('div--post')[0].style.display = "none";
    articleBtn.textContent = 'Add new article';
  }
}

btn.onclick = function() {
  if (btn.value === 'Login') {
    modal.style.display = "flex";
  }
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
