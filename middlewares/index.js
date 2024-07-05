module.exports = {
    response: (req, res) => {
        if (req.status == 200) {
            req.data = req.data || null;
            return res.status(200).json({
                message: "success",
                data: req.data
            });
        }
        if (req.status == 400) {
            req.error = req.error || "bad request";
            return res.status(400).json({
                message: "bad request",
                error: req.error
            });
        }
        if (req.status == 404) {
            req.error = req.error || "not found";
            return res.status(404).json({
                message: "not found",
                error: null
            });
        }
        if (req.status == 500) {
            req.error = req.error || "internal server error";
            return res.status(500).json({
                message: "internal server error",
                error: req.error
            });
        }
    }

};