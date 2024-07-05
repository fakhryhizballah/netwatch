const fs = require("fs");


const { grup, history, member, sequelize } = require("../models");
const e = require("express");
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
    },
    postGrup: async (req, res, next) => {
        let body = req.body;
        try {
            let insert = await grup.create({
                nameGrup: body.nameGrup,
                description: body.description,
                status: false,
                lastUpdate: new Date().toLocaleString()
            });
            console.log(insert);
            req.status = 200;
            req.data = {
                // group: insert
            };
        } catch (error) {
            console.log(error);
            if (error.errors[0].type == "unique violation") {
                req.status = 400;
                req.error = {
                    message: "nameGrup already exist",
                    error: error.original.sqlMessage
                };
                next();
            }
            req.status = 500;
            req.error = {
                message: error.message,
                error: error
            };
        }
        next();

    },
    getGrup: async (req, res, next) => {
        try {
            let group = await grup.findAll({
                attributes: { exclude: 'id' }
            });
            req.status = 200;
            req.data = {
                group: group
            };
        } catch (error) {
            req.status = 500;
            req.error = {
                message: error.message,
                error: error
            };
        }
        next();
    },
    getGrupByName: async (req, res, next) => {
        let { id } = req.params;
        try {
            let group = await grup.findOne({
                where: {
                    nameGrup: id
                },
                attributes: { exclude: 'id' },
                include: [
                    {
                        model: member,
                        as: "members",
                        // attributes: { exclude: 'id' }
                    }
                ]
            });
            if (!group) {
                req.status = 404;
                return next();
            }
            req.status = 200;
            req.data = {
                group: group
            };
        } catch (error) {
            req.status = 500;
            req.error = {
                message: error.message,
                error: error
            };
        }
        next();
    },
    addMember: async (req, res, next) => {
        let body = req.body;
        let t = await sequelize.transaction();
        try {
            let groupExist = await grup.findOne({
                where: {
                    nameGrup: body.nameGrup
                }
            }, { transaction: t });
            if (!groupExist) {
                await t.rollback();
                req.status = 400;
                req.error = {
                    message: "nameGrup not exist",
                    error: "nameGrup not found"
                };
                return next();
            }
            let insert = await member.create({
                idGrup: groupExist.id,
                name: body.name,
                ip: body.ip,
                lastUpdate: new Date().toLocaleString(),
                status: false
            }, { transaction: t });
            req.status = 200;
            req.data = {
                member: insert
            };
            await t.commit();
        } catch (error) {
            await t.rollback();
            if (error.errors[0].type == "unique violation") {
                req.status = 400;
                req.error = {
                    message: "name already exist",
                    error: error.original.sqlMessage
                };
                next();
            }

            req.status = 500;
            req.error = {
                message: error.message,
                error: error
            };
        }
        next();
    },
    delMember: async (req, res, next) => {
        let { id } = req.params;
        try {
            let memberExist = await member.findByPk(id);
            if (!memberExist) {
                req.status = 400;
                req.error = {
                    message: "member not found",
                    error: "id member not found"
                };
                return next();
            }
            await memberExist.destroy();
            req.status = 200;
            req.data = {
                message: "success delete member"
            };
        } catch (error) {
            req.status = 500;
            req.error = {
                message: error.message,
                error: error
            };
        }
        next();
    },


};