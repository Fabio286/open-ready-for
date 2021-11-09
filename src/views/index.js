const crypto = require('crypto');
const QRCode = require('qrcode');
const canvas = document.getElementById('canvas');
const qrPrefix = 'motorolardpconnection';
const version = '1.6.60';
const expire = 60;

async function getAddresses () {
   const response = await fetch('/ipaddresses');
   return response.json();
}

async function renderQR () {
   const ips = await getAddresses();
   const user = 'username';
   const pass = 'password';
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
