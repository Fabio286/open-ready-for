import express from 'express';

const router = express.Router();

router.all('/rdp/connect/success', (req, res) => {
   return res.status(200).send(JSON.stringify({ ret: 200, msg: 'success' }));
});

router.all('/rdp/connect', (req, res) => {
   return res.status(200).send(JSON.stringify({ ret: 200, msg: 'success' }));
});

router.all('*', (req, res) => {
   return res.status(404).send('Not found!');
});

export = router;
