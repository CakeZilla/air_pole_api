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

console.log(process.env.USER);
router.post('/data/insert', async (req, res) => {
  try {
    const body = req.body;
    const results = await sql_command.query(`
    INSERT INTO (station_id,pm25,pm10,power,datecreate,)
    VALUE (${body.station_id},${body.pm25},${body.pm10},${body.power},${body.datecreate})`);

    await sql_command.query(`
    UPDATE station
    SET last_pm25 = ${body.pm25},
    last_pm10 = ${body.pm10},
    last_power = ${body.power},
    last_send_date = ${body.datecreate},
    `);
    res.json(jsonFormatSuccess(results));
  } catch (error) {
    res.json(jsonFormatError(constants.ERROR_CODE_DATABASE, error));
  }
});

router.post('/data', async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const results = await sql_command.query(`
    SELECT * FROM station WHERE station_id = ${body.station_id}`);
    res.json(jsonFormatSuccess(results));
  } catch (error) {
    res.json(jsonFormatError(constants.ERROR_CODE_DATABASE, error));
  }
});

module.exports = router;
