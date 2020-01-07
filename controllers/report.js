var constants = require('../constants/constants.json');
const report = require('../models/report.js');

exports.create = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }
        report.create(
            { pool, ...req.body },
            (reports) => {
                // device.getDevicesByTopic(
                //     { pool, topic_id: req.body.topic.id },
                //     (tokens) => {
                //         if (tokens.length != undefined && tokens.length > 0) {
                //             notification.FCMSubscribe({ tokens: tokens, topic: "/topics/topic" + req.body.topic.id },
                //                 () => {
                //                     notification.FCMSendNotification(
                //                         { title: req.body.topic.name, body: req.body.content.description, topic: "/topics/topic" + req.body.topic.id, reportId: '' + reports[0].id },
                //                         (respons) => {
                //                             notification.FCMunsubscribeFromTopic({ tokens: tokens, topic: "/topics/topic" + req.body.topic.id },
                //                                 () => {
                //                                     console.log("FCM message sent :", respons);
                //                                 },
                //                                 (unsuscribeError) => {
                //                                     console.log("FCM unsubscribe error: ", unsuscribeError);
                //                                 }
                //                             );
                //                         },
                //                         (messageError) => {
                //                             console.log("FCM send message error: ", messageError);
                //                         }
                //                     );
                //                 },
                //                 (subscribeError) => {
                //                     console.log("FCM subscribe error: ", subscribeError);
                //                 }
                //             );
                //         }
                //     },
                //     (err) => {
                //         console.log("DB error occured: ", err);
                //     }
                // );
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

exports.getReportById = (req, res, pool) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send(constants.error.msg_empty_param.message);
    }

    report.getReportsByID({ pool, ...req.body },
        (reoprts) => {
            res.send({ "report": reoprts });
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
            res.send({ "reports": reports });
        },
        () => {
            res.status(400).send(constants.error.msg_error_occured);
        }
    );
}
