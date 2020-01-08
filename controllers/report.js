var constants = require('../constants/constants.json');
const report = require('../models/report.js');
const device = require('../models/device.js');
const notification = require('../controllers/notification.js')

exports.create = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }
    report.create(
        { pool, ...req.body },
        (reports) => {
            res.send(constants.success.msg_reg_report);
        },
        (err) => {
            if (err.code == 23505) {
                res.status(401).send(constants.error.msg_error_duplicate);
            } else {
                res.status(400).send(constants.error.msg_error_occured);
            }
        }
    );
}

exports.notifyregister = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }

    device.create({ pool, ...req.body },
        (result) => {
            res.send(constants.success.msg_reg_report);
        },
        (err) => {
            if (err.code == 23505) {
                res.status(401).send(constants.error.msg_error_duplicate);
            } else {
                res.status(400).send(constants.error.msg_error_occured);
            }
        }
    );
}

exports.delete = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }
    report.delete(
        { pool, ...req.body },
        (reports) => {
            res.send(constants.success.msg_reg_report);
        },
        (err) => {
            if (err.code == 23505) {
                res.status(401).send(constants.error.msg_error_duplicate);
            } else {
                res.status(400).send(constants.error.msg_error_occured);
            }
        }
    );
}

exports.update = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }
    report.update(
        { pool, ...req.body },
        (reports) => {
            res.send(constants.success.msg_reg_report);
        },
        (err) => {
            if (err.code == 23505) {
                res.status(401).send(constants.error.msg_error_duplicate);
            } else {
                res.status(400).send(constants.error.msg_error_occured);
            }
        }
    );
}

exports.notify = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }

    device.getAllDeviceTokens({ pool }, (result) => {
        console.log(result);
        if (result != undefined) {
            result.forEach(element => {
                notification.SendNotification(element, req.body,
                    (resp) => {

                    },
                    (error) => {

                    });
            });
        }
        res.send(true);
    }, () => {
        console.log("errorororo o");
        //res.status(400).send(constants.error.msg_error_occured);
    })
}

exports.getReportById = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }

    report.getReportsByID({ pool, ...req.body },
        (reoprts) => {
            res.send(reoprts);
        },
        () => {
            res.status(400).send(constants.error.msg_error_occured);
        })
}

exports.getReportsByUserID = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }

    report.getReportsByUserID(
        { pool, ...req.body },
        (reports) => {
            res.send({ "reports": reports });
        },
        () => {
            res.status(400).send(constants.error.msg_error_occured);
        }
    );
}

exports.gets = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }

    report.gets({ pool, ...req.body },
        (reports) => {
            res.send(reports);
        },
        () => {
            res.status(400).send(constants.error.msg_error_occured);
        }
    );
}
