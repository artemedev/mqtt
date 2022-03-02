"use strict";

let mqtt = require("mqtt");
let Topic = "#";
let Broker_URL = "mqtt://192.168.0.25";

let options = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    port: 1883,
    username: "ses",
    password: "vbrm.nn_ctc",
    keepalive: 60,
};

let client = mqtt.connect(Broker_URL, options);
client.on("connect", mqtt_connect);
client.on("reconnect", mqtt_reconnect);
client.on("error", mqtt_error);
client.on("message", mqtt_messsageReceived);
client.on("close", mqtt_close);

function mqtt_connect() {
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    if (err) {}
}

function mqtt_reconnect(err) {
    if (err) {}
    client = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
    if (err) {}
}

function after_publish() {}

function mqtt_messsageReceived(topic, message, packet) {
    // let topic2 = topic.split("/", 1); 

    let topic3 = topic.split("/", );
    // console.log(topic3);
    // if (topic3[0] != 0) {
    //     let topic
    // }
    // let arr1 = topic3.reverse()
    // console.log("-----------------------------------------------");
    // let arr2 = arr1[0];

    // console.log("arr2", arr2);

    let message_str = message.toString();
    insert_message(topic3, message_str, packet);
}

function mqtt_close() {}

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
});

module.exports = pool;

function insert_message(topic, message_str, packet) {
    // console.log("-----------------------------------------------");

    console.log("message_str", message_str);
    // console.log("message_str =", message_str);
    let message_arr = extract_string(message_str);
    // console.log("message_arr =", message_arr);
    let clientID = message_arr[0];
    let message = message_arr[1];

    // topic[0]
    const text = `INSERT INTO users(clientID,topic,message) VALUES($1, $2, $3) RETURNING *`;
    const values = [topic[0], topic[1], message];
    pool.query(text, values, (err, res) => {
        if (err) {} else {}
    });
}

function extract_string(message_str) {
    let message_arr = message_str.split(","); //convert to array
    return message_arr;
}

let delimiter = "/";

function countInstances(message_str) {
    let substrings = message_str.split(delimiter);
    return substrings.length - 1;
}