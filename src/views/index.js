import './main.scss';
const crypto = require('crypto');
const QRCode = require('qrcode');
const canvas = document.getElementById('canvas');
const button = document.getElementById('qrGen');
const address = document.getElementById('address');
const qrPrefix = 'motorolardpconnection';
const version = '1.6.60';
const expire = 60;
let phoneAddress;

async function getAddresses () {
   const response = await fetch('/ipaddresses');
   return response.json();
}

async function getPhoneAddress () {
   const response = await fetch('/phoneaddress');
   return response.json();
}

async function renderQR () {
   const ips = await getAddresses();
   const user = document.getElementById('user').value;
   const pass = document.getElementById('pass').value;
   const timestamp = Math.round(new Date().getTime() / 1000);
   const content = 'Moto@lenovo.com' + version + timestamp + user + pass + expire + JSON.stringify(ips);
   const token = crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);

   const hostInfo = {
      timestamp,
      version,
      expire,
      token,
      ips,
      user,
      pass,
      authLevel: 2,
      fp: 'fingerprint',
      sn: 0
   };
   const qrContent = qrPrefix + JSON.stringify(hostInfo);

   QRCode.toCanvas(canvas, qrContent, (error) => {
      if (error)
         console.error(error);
   });
}
renderQR();

setInterval(renderQR, expire * 1000);
setInterval(async () => {
   try {
      phoneAddress = await getPhoneAddress();
      if (phoneAddress)
         address.innerHTML = `Phone Address: ${phoneAddress}`;
   }
   catch (err) {}
}, 3000);

button.addEventListener('click', e => {
   e.preventDefault();
   renderQR();
});
