"use strict";
require('dotenv').config();
const { grup, history, member, sequelize } = require("./models");
const moment = require('moment');
const mqtt = require("mqtt");
const client = mqtt.connect({
    host: process.env.MqttHost,
    port: process.env.MqttPort,
    username: process.env.MqttUsername,
    password: process.env.MqttPassword,
    clientId: process.env.MqttServerId,
    keepalive: 60,
    protocolId: 'MQTT',
    protocolVersion: 4,
});
console.log("Broker ID: " + process.env.MqttServerId);
client.on("connect", () => {
    console.log("connected");
    client.subscribe("clinet/Offline")
    client.subscribe("clinet/Online")
    client.subscribe("cilent/Update/#")
});

client.on("message", async (topic, message) => {
    // message is Buffer
    console.log(topic);
    console.log(message.toString());
    if (topic == "clinet/Online") {
        console.log("client offline");
        // client.publish("gateway/" + message, 'ini adalah pesan dari server');
        try {
        let clientGroup = await grup.findOne({
            where: {
                nameGrup: message
            },
            include: [
                {
                    model: member,
                    as: "members",
                    // attributes: { exclude: 'id' }
                }
            ]
        });
        clientGroup.update({
            status: true,
            lastUpdate: new Date()
        });
        // console.log(clientGroup);
        client.publish("gateway/" + message, JSON.stringify(clientGroup));
        } catch (error) {
            console.log(error);
        }
    } else if (topic == "clinet/Offline") {
        console.log("client offline");
        // client.publish("gateway/" + message, 'ini adalah pesan dari server');
        try {
        let clientGroup = await grup.findOne({
            where: {
                nameGrup: message
            },
        });

        clientGroup.update({
            status: false,
            lastUpdate: new Date()
        });
        } catch (error) {
            console.log(error);
        }
    } else if (topic == "cilent/Update/online") {
        console.log("IP online" + message);
        let statusMember = await member.findByPk(message);
        statusMember.update({
            status: true,
            lastUpdate: new Date()
        });
        // console.log(statusMember._previousDataValues);
        let lastHistory = await history.findOne({
            where: {
                idMembers: message,
            },
            order: [
                ['lastUpdate', 'DESC']
            ]
        });
        // console.log(lastHistory);
        if (lastHistory == null) {
            console.log("create new history");
            await history.create({
                idMembers: message,
                lastUpdate: new Date(),
                status: true,
                duration: "0",
                uptime: 0
            });
        } else if (lastHistory.status == false) {
            console.log("create new history");
            let startDate = moment(lastHistory.lastUpdate);
            let endDate = moment(new Date());
            let dif = endDate.diff(startDate);
            await history.create({
                idMembers: message,
                lastUpdate: new Date(),
                status: true,
                duration: moment.duration(dif).humanize() + " (Offline Time)",
                uptime: dif
            });
        }

    } else if (topic == "cilent/Update/offline") {
        console.log("IP offline" + message);
        let statusMember = await member.findByPk(message);
        statusMember.update({
            status: false,
            lastUpdate: new Date()
        });
        let lastHistory = await history.findOne({
            where: {
                idMembers: message,
            },
            order: [
                ['lastUpdate', 'DESC']
            ]
        });
        // console.log(lastHistory);
        if (lastHistory == null) {
            console.log("create new history");
            await history.create({
                idMembers: message,
                lastUpdate: new Date(),
                status: false,
                duration: "0",
                uptime: 0
            });
        } else if (lastHistory.status == true) {
            console.log("create new history");
            let startDate = moment(lastHistory.lastUpdate);
            let endDate = moment(new Date());
            let dif = endDate.diff(startDate);
            await history.create({
                idMembers: message,
                lastUpdate: new Date(),
                status: false,
                duration: moment.duration(dif).humanize() + " (Online Time)",
                uptime: dif
            });
        }
    }
});