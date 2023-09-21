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

// console.log(process.env.USER);
router.post('/station/data/insert', async (req, res) => {
  try {
    const body = req.body;
    var nowdate = moment().format('YYYY-MM-DD HH:mm:ss');
    const results = await sql_command.query(`
    INSERT INTO data(station_id,pm25,pm10,power,datecreate)
    VALUES (${body.station_id},${body.pm25},${body.pm10},${body.power},'${nowdate}')`);

    await sql_command.query(`
    UPDATE station
    SET last_pm25 = ${body.pm25},
    last_pm10 = ${body.pm10},
    last_power = ${body.power},
    last_send_date = '${nowdate}'
    WHERE station_id = ${body.station_id}
    `);
    const last_results = await sql_command.query(`
    SELECT * FROM station WHERE station_id = ${body.station_id}`);
    res.json(jsonFormatSuccess(last_results));
  } catch (error) {
    res.json(jsonFormatError(constants.ERROR_CODE_DATABASE, error));
  }
});

router.post('/station', async (req, res) => {
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

router.get('/station/all', async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const results = await sql_command.query(`
    SELECT * FROM station`);
    res.json(jsonFormatSuccess(results));
  } catch (error) {
    res.json(jsonFormatError(constants.ERROR_CODE_DATABASE, error));
  }
});

router.get('/station/:station_id', async (req, res) => {
  try {
    const params = req.params;
    const results = await sql_command.query(`
    SELECT * FROM station WHERE station_id = ${params.station_id}`);
    res.json(jsonFormatSuccess(results));
  } catch (error) {
    console.log(error);
    res.json(jsonFormatError(constants.ERROR_CODE_DATABASE, error));
  }
});

module.exports = router;
