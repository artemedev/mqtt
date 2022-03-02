"use strict";

let mqtt = require("mqtt");
let Topic = "#";
let Broker_URL = "mqtt://192.168.0.25";
// const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const clientMongo = new MongoClient('mongodb+srv://mongo:root@cluster0.l9ghz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

let options = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    port: 1883,
    username: "ses",
    password: "vbrm.nn_ctc",
    keepalive: 60,
};


const start = async(topic, key) => {
    try {
        await clientMongo.connect()
        console.log('соединение установлено');
        // if (!clientMongo.db().createCollection('Test')) {

        // }
        // key.id = topic;
        if (!clientMongo.db().collection(topic)) {
            await clientMongo.db().createCollection(topic) //создание коллекции
        }
        // console.log(topic);


        const tests = clientMongo.db().collection(topic);

        await tests.insertOne(key);

    } catch (e) {
        console.log(e);

    }
}

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
    let topic3 = topic.split("/", );
    let message_str = message.toString();
    insert_message(topic3, message_str, packet);
}

function mqtt_close() {}

function insert_message(topic, message_str, packet) {
    if (topic[1] == undefined) {
        if (message_str !== 'begin') {
            let message_str_JSON = JSON.parse(message_str);
            if (message_str_JSON != '0') start(topic[0], message_str_JSON)
        }
    }
}

function extract_string(message_str) {
    let message_arr = message_str.split(","); //convert to array
    return message_arr;
}



function countInstances(message_str) {
    let delimiter = "/";
    let substrings = message_str.split(delimiter);
    return substrings.length - 1;
}