import express from 'express';
const { networkInterfaces } = require('os');
const app = express();
const router = express.Router();

// router.all('/rdp/connect/success', (req, res) => {
//    return res.status(200).send({ ret: 200, msg: 'success' });
// });

// router.all('/rdp/connect', (req, res) => {
//    phoneAddress = req.body.phoneIp || req.query.phoneIp;
//    return res.status(200).send({ ret: 200, msg: 'success' });
// });

router.get('/ipaddresses', (req, res) => {
   const nets = networkInterfaces();
   const results = [];

   for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
         if (net.family === 'IPv4' && !net.internal)
            results.push(net.address);
      }
   }
   return res.status(200).send(results);
});

router.get('/phoneaddress', (req, res) => {
   return res.status(200).send(app.locals.phoneAddress);
});

router.all('*', (req, res) => {
   return res.status(404).send('Not found!');
});

export = router;
