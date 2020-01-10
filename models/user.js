exports.create = (param, callback, errCallback) => {
    const addDeviceSQL = "INSERT INTO users(user_id, displayName, photoUrl) VALUES($1, $2, $3) RETURNING *";

    param.pool.query(addDeviceSQL, [param.user_id, param.displayName, param.photoUrl],
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
    const deleteDeviceSQL = "DELETE FROM users WHERE user_id = $1 RETURNING *";

    param.pool.query(deleteDeviceSQL, [param.user_id],
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                callback(data.rows);
            }
        }
    );
}