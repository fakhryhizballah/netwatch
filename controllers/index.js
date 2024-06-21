const fs = require("fs");
const cron = require("node-cron");
const ping = require("ping");
module.exports = {
    addRouter: async (req, res, next) => {
        let { name, group, ip } = req.body;
        if (!name || !group || !ip) {
            req.status = 400;
            req.error = "ip, name, group is required";
            return next();
        }
        let groupExist = fs.existsSync("./data/" + group + ".json");
        if (!groupExist) {
            fs.writeFileSync("./data/" + group + ".json", JSON.stringify([
                {
                    name, ip,
                    last_update: new Date().toLocaleString(),
                    status: false
                }
            ]));
        }
        let datagroup = fs.readFileSync("./data/" + group + ".json", "utf8");
        datagroup = JSON.parse(datagroup);
        let exist = datagroup.find((element) => element.ip == ip);
        if (!exist) {
            datagroup.push({
                name, ip,
                last_update: new Date().toLocaleString(),
                status: false
            });
            fs.writeFileSync("./data/" + group + ".json", JSON.stringify(datagroup));
        }
        req.status = 200;
        req.data = {
            groupExist: datagroup
        };
        next();
    },
    getGrupRute: async (req, res, next) => {
        let { group } = req.params;
        let groupExist = fs.existsSync("./data/" + group + ".json");
        if (!groupExist) {
            req.status = 404;
            return next();
        }
        let datagroup = fs.readFileSync("./data/" + group + ".json", "utf8");
        datagroup = JSON.parse(datagroup);

        req.status = 200;
        req.data = {
            groupExist: datagroup
        };
        next();
    }

};