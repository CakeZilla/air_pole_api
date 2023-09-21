# air_pole_api

- url : http://45.144.166.66:12201/air/api/v1/station
- method :
  POST
- body :
  {
  "station_id": 1
  }
- response :
  {
  "success": 1,
  "data": [
  {
  "station_id": 1,
  "station_name": "Station 1 ",
  "station_address": null,
  "station_lat": null,
  "station_lng": null,
  "last_pm25": 50,
  "last_pm10": 25.15,
  "last_power": 11.54,
  "last_send_date": "2023-09-06T15:06:43.000Z",
  "datecreate": "2566-09-06T15:00:16.000Z"
  }
  ]
  }

- url : http://45.144.166.66:12201/air/api/v1/station/data/insert
- method :
  POST
- body :
  {
  "station_id": 1,
  "pm25":50,
  "pm10":25.15,
  "power":11.54
  }
- response :
  {
  "success": 1,
  "data": [
  {
  "station_id": 1,
  "station_name": "Station 1 ",
  "station_address": null,
  "station_lat": null,
  "station_lng": null,
  "last_pm25": 50,
  "last_pm10": 25.15,
  "last_power": 11.54,
  "last_send_date": "2023-09-06T15:06:43.000Z",
  "datecreate": "2566-09-06T15:00:16.000Z"
  }
  ]
  }
