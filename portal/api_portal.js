const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const multer = require('multer');
const sql_command = require('../utils/sql_command');
const Authenticate = require('./verify-token');
const GenerateAuthToken = require('./generator-token');
const constants = require('../utils/constants');
var request = require('request');
var moment = require('moment');
var axios = require('axios');
const { jsonFormatSuccess, jsonFormatError } = require('../utils/format_json');

router.post('/portal/line/broadcast', Authenticate, async (req, res) => {
  const user = req.user;
  const params = req.body;
  let messages = [];
});

module.exports = router;
