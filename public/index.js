console.log('i run');

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
