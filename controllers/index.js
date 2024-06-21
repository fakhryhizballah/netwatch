const fs = require("fs");
const cron = require("node-cron");
const ping = require("ping");
// async function netwacth() {
//    let config = await fs.readFileSync("./config.json", "utf8");
//     let configJson = JSON.parse(config);
//     let newConfig = [];
//     for(let i=0;i<configJson.length;i++){
//         let element = configJson[i];
//         let stat
//         await ping.sys.probe(element.ip, function (isAlive) {
//             if (isAlive) {
//                 stat = {
//                     ...element,
//                     last_update: new Date().toLocaleString(),
//                     status: true,
//                 };
//             } else {
//                 stat = {
//                     ...element,
//                     last_update: new Date().toLocaleString(),
//                     status: false,
//                 };
//             }
//             newConfig.push(stat);
//             if (element.status != stat.status) {
//                 let online = stat.status ? "online" : "offline";
//                 console.log("status changed "+ online +" "+ stat.ip);
//                let log =  fs.readFileSync("./log.json", "utf8");
//                 let logJson = JSON.parse(log);
//                 logJson.push(stat);
//                 fs.writeFileSync("./log.json", JSON.stringify(logJson));
//             }
//         });
//     }
//     fs.writeFileSync("./config.json", JSON.stringify(newConfig));

// }
// cron.schedule("*/2 * * * *", () => {
// netwacth();
// });

module.exports = {
    addRouter: async (req, res, next) => {
        req.status = 400;
        next();

    }
};