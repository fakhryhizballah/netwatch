require('dotenv').config();
module.exports = {
    members: (req, res) => {
        let params = req.params;
        res.cookie('baseName', params.name, { maxAge: 900000 });
        let data = {
            title: params.name + "| Netwatch",
            baseName: params.name
        };
        res.render("members", data);
    },
    history: (req, res) => {
        // let params = req.params;

        let data = {
            title: "History | Netwatch",
        };
        res.render("history", data);
    }
};