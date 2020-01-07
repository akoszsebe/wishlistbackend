exports.create = (param, callback, errCallback) => {

    let addUserSQL = 'INSERT INTO reports(title, content, user_id) VALUES($1, $2, $3) RETURNING *';
    
    console.log(addUserSQL)

    param.pool.query(addUserSQL, [param.title, param.content,param.user_id ],
        (err, data) => {
            if (err) {
                console.log(err)
                errCallback(err);
            } else {
                console.log(data.rows)
                callback(data.rows);
            }
        }
    );
}

exports.delete = (param, callback, errCallback) => {

    let deleteTodoSQL = 'DELETE FROM reports WHERE id = $1 RETURNING *';
    
    console.log(deleteTodoSQL)

    param.pool.query(deleteTodoSQL, [param.id ],
        (err, data) => {
            if (err) {
                console.log(err)
                errCallback(err);
            } else {
                console.log(data.rows)
                callback(data.rows);
            }
        }
    );
}

exports.get = (param, callback, errCallback) => {
    const getAllReportsByIdSQL = "SELECT * FROM reports WHERE id = ($1)";
    param.pool.query(getAllReportsByIdSQL, [param.id],
        (err, data) => {
            if (err) {
                console.log(err)
                errCallback(err);
            } else {
                // console.log(data)
                data.rows.forEach(element => {
                    element.content = JSON.parse(element.content);
                });
                callback(data.rows[0]);
            }
        }
    );
}


exports.gets = (param, callback, errCallback) => {
    const getAllReportsByIdSQL = "SELECT * FROM reports ORDER BY id DESC";
    param.pool.query(getAllReportsByIdSQL,
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                console.log(data.rows)
                callback(data.rows);
            }
        }
    );
}

exports.getReportByUser = (param, callback, errCallback) => {
    const getAllReportsByIdSQL = "SELECT * FROM reports where user_id = $1 ORDER BY id DESC";
    param.pool.query(getAllReportsByIdSQL, [param.user_id],
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                data.rows.forEach(element => {
                    element.content = JSON.parse(element.content);
                });
                callback(data.rows);
            }
        }
    );
}
