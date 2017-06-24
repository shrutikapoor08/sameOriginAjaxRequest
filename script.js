var data;
(function makeRequest() {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up. Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('GET', 'data.json', true);
  httpRequest.send();
})();

function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      data = httpRequest.responseText;
      parseData();
    } else {
      alert('There was a problem with the request.');
    }
  }
};

function parseData() {
  var publishedData = data.filter(function(obj) {
    return obj['is_published'];
  });
  data = publishedData;
  sortData();
};

function sortData() {
  var assetsNode = document.getElementById('assets-data');
  assetsNode.innerHTML = '';
  if (assetsNode.className === 'desc') assetsNode.className = 'asc';
  else assetsNode.className = 'desc';
  let order = assetsNode.className;

  data.sort(function(a, b) {
    if (order === 'desc') {
      return a.title.toLowerCase() > b.title.toLowerCase();
    } else return a.title.toLowerCase() < b.title.toLowerCase();
  });
  addData(data);
}

function addData(data) {
  data.forEach(function(obj) {
    var element = '<img src="images/' + obj.image_name + ' " class="assets-image" />';
    element += '<h3 class="image-title">' + obj.title + '</h3> <h4>' + obj.image_name + '</h4>';
    element += '<p>' + obj.description + '</p>';
    element += '<i class="material-icons">favorite</i><i class="material-icons">grade</i>';
    var newDiv = document.createElement("div");
    newDiv.className = 'assets-container';

    newDiv.innerHTML = element;
    document.getElementById('assets-data').appendChild(newDiv);
  });
}
