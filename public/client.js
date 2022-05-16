const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const pop = document.getElementById('qrcode-container');
const close = document.getElementById('close');

const qrcodeContainer = document.getElementById("qrcode");

connect_client(uniqueId());

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});


document.addEventListener("click", (e) => {
  const isClosest = e.target.closest(pop);
  if (!isClosest) {
    modal_container.classList.remove('show');
  }
});


function generateQRCode(unique_key) {
  qrcodeContainer.innerHTML = "";
  new QRCode(qrcodeContainer, {
    text: unique_key,
    width: 350,
    height: 350,
    colorDark: "#1A1A22",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  document.getElementById("qrcode-container").style.display = "block";
}


function connect_client(qr_key) {
  var connection = new WebSocket(`ws://${location.host}?device=web&key=${qr_key}`);
  connection.onopen = function(ws, req) {
    generateQRCode(qr_key)
    connection.onmessage = function(mes) {
      try {
        const parsed = JSON.parse(mes.data);
        switch (parsed["type"]) {
          case "scanned":
            fetch('example.json').then(response =>  response.json()).then(cart =>{ 
              connection.send(JSON.stringify({
                "send_to": parsed["id"],
                "type": "cart",
                "data": cart
              }))
            })
            break;
        }
      } catch (err) {}
    };
  };
}

function uniqueId() {
  var unique = '';
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 25; i++) {
    unique += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return unique;
}