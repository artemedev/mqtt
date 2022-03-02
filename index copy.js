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

// const start = async ()=>{
//     try{
//         await client.connect()

//     }catch(e){
//         console.log(e);
//     }
// }

const start = async(topic, key) => {
    try {
        await clientMongo.connect()
        console.log('соединение установлено');
        // await clientMongo.db().createCollection('Test') //создание коллекции

        key.id = topic;
        const tests = clientMongo.db().collection('Test')
        await tests.insertOne(key)
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

// const Pool = require("pg").Pool;
// const pool = new Pool({
//     user: "postgres",
//     password: "root",
//     host: "localhost",
//     port: 5432,
//     database: "usersdb2",
// });

// pool.connect(function(err) {
//     if (err) throw err;
// });

// module.exports = pool;

// let top
let val = []

function insert_message(topic, message_str, packet) {
    console.log(topic[1]);
    if (topic[0] == "3834034736363039002b0033") {
        // const values = [topic[1], message_str];
        if (topic[1] == undefined) {
            let data2 = JSON.parse(message_str);
            // console.log(data2);

            start(topic[0], data2)
        }
        // val.push(`${values}`)
        // console.log(values);
        // if (topic[1] == undefined) {


        //     let data2 = JSON.parse(message_str);
        //     for (let key in data2) {
        //         // mongoose.connect(process.env.DB_URL, {
        //         //         useNewUrlParser: true,
        //         //         useUnifiedTopology: true,
        //         //     })
        //         // console.log(key);
        //         // val.push(`${key}`);
        //         // start(key)
        //         // tests.insertOne(key);
        //         console.log(data2);
        //         // mongoose.model('Test', {
        //         //     author: {
        //         //         type: String,
        //         //         index: true
        //         //     }
        //         // });
        //         // const text = `INSERT INTO tamper2(key) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
        //         // pool.query(text, val, (err, res) => {
        //         //     if (err) {
        //         //         console.log(err.stack);
        //         //     } else {
        //         //         console.log(res.rows[0]);
        //         //     }
        //         // });
        //     }

        //     // const text = `INSERT INTO tamper1(val) VALUES RETURNING *`;



        // }
    }
    //если топик равен топу который нужнен
    // if (topic[0] == "3834034736363039002b0033") {
    //     const values = [topic[1], message_str];
    // const values = [message_str];
    // const values = [message_str];
    // val.push(`${values}`);
    // if (topic[1] != undefined) {

    //     if (val.length === 11) {


    //         console.log(val[0]);

    //     }
    // console.log(topic[1]);
    // const textPG = `SELECT column_name, data_type
    //                 FROM information_schema.columns
    //                 WHERE table_name = 'tablename'
    //                 ORDER BY ordinal_position;`
    // pool.query(textPG, (err, res) => {
    //     if (err) {
    //         console.log(err.stack)
    //     } else {
    //         console.log(res)
    //     }
    // });
    // }
    // if (topic[1] != undefined) {
    //     val.push(`${values}`);
    //     console.log(val);
    // }
    // console.log(values.indexOf('TamperMoveCount'));

    // top.push(`${topic[1]}`)

    // if (topic[1] != undefined) {
    //     val.push(`${values}`);
    //     console.log(val[0]);
    // }
    // const textPG = `SELECT * FROM tamper1 where ${}`

    // pool.query(textPG, (err, res) => {
    //     if (err) {
    //         // console.log(err.stack)
    //     } else {
    //         console.log(res.rows)
    //     }
    // });

    // const textPG = `SELECT * FROM tamper1 where `

    // pool.query(textPG, (err, res) => {
    //     if (err) {
    //         // console.log(err.stack)
    //     } else {
    //         console.log(res.rows)
    //     }
    // });

    // }


    //узнать что записано в tamper1
    // if (val.length === 11) {
    //     const textPG = `SELECT * FROM tamper1`
    //     pool.query(textPG, (err, res) => {
    //         if (err) {
    //             // console.log(err.stack)
    //         } else {
    //             console.log(res.rows)
    //         }
    //     });
    // }


    //запись в sql данных из mqtt
    // console.log(val.length);
    // if (val.length === 11) {
    //     const text = `INSERT INTO tamper1(PosixTime,DoorChangeCount,DoorStatus,BatVoltage,TamperMoveCount,TamperBrakeCount,TamperMove,TamperBrake,SignalQuality,SimCIMI,DateTimeStamp) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
    //     pool.query(text, val, (err, res) => {
    //         if (err) { console.log(err) } else {

    //         }
    //     });
    // }
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