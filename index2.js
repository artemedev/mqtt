"use strict";
// const mqtt = require("mqtt");

// const host = "192.168.0.25";
// const port = "1883";
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

// const connectUrl = `mqtt://${host}:${port}`;
// const client = mqtt.connect(connectUrl, {
//     clientId,
//     clean: true,
//     connectTimeout: 4000,
//     username: "ses",
//     password: "vbrm.nn_ctc",
//     reconnectPeriod: 1000,
// });

// const topic = '/nodejs/mqtt'
//     // client.on('connect', () => {
//     //     console.log('Connected')
//     //     client.subscribe([topic], () => {
//     //         console.log(`Subscribe to topic '${topic}'`)
//     //     })
//     //     client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//     //         if (error) {
//     //             console.error(error)
//     //         }
//     //     })
//     // })
//     // client.on('message', (topic, payload) => {
//     //     console.log('Received Message:', topic, payload.toString())
//     // })

// // var client = mqtt.connect(Broker_URL, options);
// client.on("connect", mqtt_connect);
// client.on("reconnect", mqtt_reconnect);
// client.on("error", mqtt_error);
// client.on("message", mqtt_messsageReceived);
// client.on("close", mqtt_close);

// function mqtt_connect() {
//     //console.log("Connecting MQTT");
//     client.subscribe(Topic, mqtt_subscribe);
// }

// function mqtt_subscribe(err, granted) {
//     console.log("Subscribed to " + Topic);
//     if (err) {
//         console.log(err);
//     }
// }

// function mqtt_reconnect(err) {
//     //console.log("Reconnect MQTT");
//     //if (err) {console.log(err);}
//     client = mqtt.connect(Broker_URL, options);
// }

// function mqtt_error(err) {
//     //console.log("Error!");
//     //if (err) {console.log(err);}
// }

// function after_publish() {
//     //do nothing
// }

// function mqtt_messsageReceived(topic, message, packet) {
//     //console.log('Message received = ' + message);
//     insert_message(topic, message, packet);
// }

// function mqtt_close() {
//     //console.log("Close MQTT");
// }

////////////////////////////////////////////////////
///////////////////// POSTGRES ////////////////////////
////////////////////////////////////////////////////
// const Pool = require("pg").Pool;
// const pool = new Pool({
//     user: "postgres",
//     password: "root",
//     host: "localhost",
//     port: 5432,
//     database: "postgres",
// });

// module.exports = pool;

// connection.connect(function(err) {
//     if (err) throw err;
//     //console.log("Database Connected!");
// });
////////////////////////////////////////////////////
///////////////////// MYSQL ////////////////////////
////////////////////////////////////////////////////
// var mysql = require("mysql");

// //Create Connection
// var connection = mysql.createConnection({
//   host: Database_URL,
//   user: "newuser",
//   password: "mypassword",
//   database: "mydb",
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   //console.log("Database Connected!");
// });

// //insert a row into the tbl_messages table
// function insert_message(topic, message, packet) {
//   var clientID = "client001";
//   var sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
//   var params = [
//     "tbl_messages",
//     "clientID",
//     "topic",
//     "message",
//     clientID,
//     topic,
//     message,
//   ];
//   sql = mysql.format(sql, params);
//   connection.query(sql, function (error, results) {
//     if (error) throw error;
//     console.log("1 record inserted");
//   });
// }

var mqtt = require("mqtt");
var Topic = "#"; //subscribe to all topics
var Broker_URL = "mqtt://192.168.0.25";

var options = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    port: 1883,
    username: "ses",
    password: "vbrm.nn_ctc",
    keepalive: 60,
};

var client = mqtt.connect(Broker_URL, options);
client.on("connect", mqtt_connect);
client.on("reconnect", mqtt_reconnect);
client.on("error", mqtt_error);
client.on("message", mqtt_messsageReceived);
client.on("close", mqtt_close);

function mqtt_connect() {
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    console.log("Subscribed to " + Topic);
    if (err) {
        console.log(err);
    }
}

function mqtt_reconnect(err) {
    console.log("Reconnect MQTT");
    if (err) {
        console.log(err);
    }
    client = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
    console.log("Error!");
    if (err) {
        console.log(err);
    }
}

function after_publish() {
    //do nothing
}

function mqtt_messsageReceived(topic, message, packet) {
    var message_str = message.toString(); //convert byte array to string
    // console.log(message_str);
    // message_str = message_str.replace(/\n$/, ""); //remove new line
    // console.log("new =", message_str);

    //payload syntax: clientID,topic,message
    // if (countInstances(message_str) != 1) {
    //     // console.log("Invalid payload");
    // } else {
    insert_message(topic, message_str, packet);
    //console.log(message_arr);
    // }
}

function mqtt_close() {
    // console.log("Close MQTT");
}

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "usersdb2",
});

pool.connect(function(err) {
    if (err) throw err;
    // console.log("Database Connected!");
});

module.exports = pool;

function insert_message(topic, message_str, packet) {
    // console.log("topic", topic);
    // console.log("message_str =", message_str);
    var message_arr = extract_string(message_str); //split a string into an array
    var clientID = message_arr[0];
    var message = message_arr[1];
    // var clientID = "client001";
    // var sql =INSERT INTO tbl_messages (clientID,topic,message) VALUES (${clientID}, ${topic}, ${message});
    const text = `INSERT INTO users(clientID,topic,message) VALUES($1, $2, $3) RETURNING *`;
    const values = [clientID, topic, message];
    pool.query(text, values, (err, res) => {
        if (err) {
            // console.log(err.stack);
        } else {
            // console.log(res.rows[0]);
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }
    });
    // pool.query();
}
//split a string into an array of substrings
function extract_string(message_str) {
    let message_arr = message_str.split(","); //convert to array
    return message_arr;
}

//count number of delimiters in a string
var delimiter = ",";

function countInstances(message_str) {
    let substrings = message_str.split(delimiter);
    return substrings.length - 1;
}