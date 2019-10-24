const TARGET = document.getElementById('target');
const URL = {
  EVENTS: 'https://api.fda.gov/device/event.json?search=event_type:death&limit=100',
  DEVICENAMES: 'https://api.fda.gov/device/event.json?search=event_type:death&count=device.openfda.device_name.exact'
};

window.onload = () => {
  sendHttpRequest(URL.EVENTS, (response) => {
    for (let i = 0; i < response.results.length; i++) {
      new Event(response.results[i]).appendTo(TARGET);
    }
  });
};
