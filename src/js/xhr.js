const sendHttpRequest = (url, callback) => {
  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(JSON.parse(xhr.responseText));
      }
    }
  };
  xhr.send();
};
