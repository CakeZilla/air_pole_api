const { connection, connection_ipst, connection_smartbox } = require('../db/sql_connection');

const query = (options, value = []) => {
    return new Promise((resolve, reject) => {
        connection.query(options, value, function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(JSON.stringify(results)));
            }
        });
    });
};

const query_ipst = (options, value = []) => {
    return new Promise((resolve, reject) => {
        connection_ipst.query(options, value, function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(JSON.stringify(results)));
            }
        });
    });
};

const query_smartbox = (options, value = []) => {
    return new Promise((resolve, reject) => {
        connection_smartbox.query(options, value, function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(JSON.stringify(results)));
            }
        });
    });
};

module.exports = {
    query,
    query_ipst,
    query_smartbox
};