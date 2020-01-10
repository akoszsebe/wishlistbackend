exports.checkDeviceToken = (param, callback, errCallback) => {
    const checkDeviceTokeSQL = "SELECT * FROM devices WHERE token = ($1);";
    param.pool.query(checkDeviceTokeSQL, [param.token],
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                callback(data.rows);
            }
        }
    );
}

exports.create = (param, callback, errCallback) => {
    const addDeviceSQL = "INSERT INTO devices(token, user_id) VALUES($1, $2) RETURNING *";

    param.pool.query(addDeviceSQL, [param.token, param.user_id],
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {

                callback(data.rows);
            }
        }
    );
}

exports.delete = (param, callback, errCallback) => {
    const deleteDeviceSQL = "DELETE FROM devices WHERE token = $1 RETURNING *";

    param.pool.query(deleteDeviceSQL, [param.token],
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                callback(data.rows);
            }
        }
    );
}

exports.getDevicesByTopic = (param, callback, errCallback) => {
    const getDevicesByTopicSQL = `SELECT token FROM devices
    INNER JOIN users ON (devices.user_id = users.id) 
    INNER JOIN users_topics ON (users.id = users_topics.user_id)
    WHERE users_topics.topic_id = ($1);`

    param.pool.query(getDevicesByTopicSQL, [param.topic_id],
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                let result = [];
                data.rows.forEach(element => {
                    result.push(element.token);
                });
                callback(result);
            }
        }
    );

}

exports.getDevicesByUser = (param, callback, errCallback) => {
    const getDevicesByUser = `SELECT token FROM public.devices 
                                  where user_id = ($1);`

    param.pool.query(getDevicesByUser, [param.owner_id],
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                let result = [];
                data.rows.forEach(element => {
                    result.push(element.token);
                });
                callback(result);
            }
        }
    );
}

exports.getAllDeviceTokens = (param, callback, errCallback) => {
    const getDevicesByUser = `SELECT * FROM public.devices;`

    param.pool.query(getDevicesByUser,
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                let result = [];
                data.rows.forEach(element => {
                    result.push(element.token);
                });
                callback(result);
            }
        }
    );

}

//
// ;