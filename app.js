const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const cors = require('cors');

const appVersion = 'v1';

// CORS
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const api_version = `/air/api/${appVersion}`;
app.use(api_version, require('./portal/api_portal'));
//create app server
// const key = fs.readFileSync('/usr/share/nginx/ssl/ipstthailand.com/ipstthailand.com.key');
// const cert = fs.readFileSync('/usr/share/nginx/ssl/ipstthailand.com/ipstthailand.com.crt');
// const ca = fs.readFileSync('/usr/share/nginx/ssl/ipstthailand.com/ssl-bundle.crt');
// const options = {key: key, cert: cert, ca: ca};
// var server = https.createServer(options, app).listen(3001,  "ipstthailand.com", function () {
// var server = https.createServer(app).listen(3001, "127.0.0.1", function() {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("Example app listening at https://%s:%s", host, port);
// });
app.listen(3000);
