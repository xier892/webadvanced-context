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

window.onload = () => {
  sendHttpRequest('https://api.fda.gov/device/event.json?search=event_type:death&limit=100', (response) => { global.events = response; });
  sendHttpRequest('https://api.fda.gov/device/event.json?search=event_type:death&count=device.openfda.device_name.exact', (response) => { global.deviceNames = response; });

  console.log(global);
};
