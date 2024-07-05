require('dotenv').config();
module.exports = {
    login: (req, res) => {
        let params = req.params;
        let baseURL = process.env.BASE_URL || "http://localhost:3000";
        let data = {
            title: params.name + "| Netwatch",
            baseName: params.name,
            baseURL: baseURL
        };
        res.render("members", data);
    }
};