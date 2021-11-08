const crypto = require('crypto');
const QRCode = require('qrcode');
const canvas = document.getElementById('canvas');
const qrPrefix = 'motorolardpconnection';
const version = '1.6.60';
const expire = 60;

function renderQR () {
   const user = 'user';
   const pass = 'pass';
   const ips = ['192.168.1.100'];
   const timestamp = Math.round(new Date().getTime() / 1000);
   const content = 'Moto@lenovo.com' + version + timestamp + user + pass + expire + JSON.stringify(ips);
   const token = crypto.createHash('sha256').update(content).digest('hex');

   const hostInfo = {
      timestamp,
      version,
      expire,
      token,
      ips,
      user,
      pass,
      authLevel: 2,
      fp: false,
      sn: 0
   };
   const qrContent = qrPrefix + JSON.stringify(hostInfo);

   QRCode.toCanvas(canvas, qrContent, (error) => {
      if (error)
         console.error(error);
      else
         console.log('render qr');
   });
}
renderQR();

setInterval(renderQR, expire * 1000);
