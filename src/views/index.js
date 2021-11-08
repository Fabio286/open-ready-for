const crypto = require('crypto');
const QRCode = require('qrcode');
const canvas = document.getElementById('canvas');
const qrPrefix = 'motorolardpconnection';
const user = 'user';
const pass = 'pass';
const version = '1.6.60';
const ips = ['192.168.56.1', '192.168.1.100'];
const expire = 60;
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

function renderQR () {
   QRCode.toCanvas(canvas, qrContent, (error) => {
      if (error) console.error(error);
   });
}
renderQR();

setInterval(renderQR, expire * 1000);
