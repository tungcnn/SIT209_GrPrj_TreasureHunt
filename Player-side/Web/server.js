const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});
   

app.get('/', function (req, res) {
    res.sendFile(`${base}/homepage.html`);
   });

app.get('/playerhomepage', (req, res) => {
    res.sendFile(`${base}/playerhomepage.html`);
   });
   app.get('/store', (req, res) => {
    res.sendFile(`${base}/store.html`);
   });
app.get('/login', (req, res) => {
    res.sendFile(`${base}/login.html`);
   });
app.get('/loginstore', (req,res) => {
    res.sendFile(`${base}/loginstore.html`);
});
app.get('/registration', (req, res) => {
    res.sendFile(`${base}/registration.html`);
    });
app.get('/test', (req,res) => {
    res.sendFile(`${base}/test.html`);
});
app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
   });
   

app.listen(port, () => {
    console.log(`listening on port ${port}`);
    });

