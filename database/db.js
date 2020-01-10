'use strict';

const schemas = require('./schemas');


const Db = module.exports = function (_pool) {
    this.pool = _pool;
}

Db.prototype.create = function (callback) {
    console.log("itt")
    const self = this
    self.createTodoTable((success) => {
        console.log(success);
        if (success) {
            self.createDeviceTable((success) => {
                console.log(success);
                if (success){
                    self.createUserTable((success) => {
                        console.log(success);
                        return callback(success);
                    });
                } else {
                    return callback(success);
                }
            })
        } else {
            return callback(success);
        }
    })
}

Db.prototype.drop = function (__callback) {
    const self = this;
    self.deleteTable(schemas.deleteTodosTableSQL, (success) => {
        if (success) {
            self.deleteTable(schemas.deleteDeviceTableSQL, (success) => {
                if (success) {
                    self.deleteTable(schemas.deleteUsersTableSQL, (success) => {
                        return __callback(success);
                    });
                } else {
                    return __callback(success);
                }
            });
        } else {
            return __callback(success);
        }
    })
}

Db.prototype.deleteTable = function (tablename, _callback) {
    this.pool.query(tablename, (err, res) => {
        if (err)
            return _callback(err)
        else
            return _callback(true)
    });
}


Db.prototype.createTodoTable = function (_callback) {
    console.log("itt todos")
    const self = this;
    self.pool.query(schemas.creatTodosSQL,
        (err, data) => {
            if (err) {
                console.log('Error creating todo tables', err);
                return _callback(err)
            }
            return _callback(true)
        }
    );
}

Db.prototype.createUserTable = function (_callback) {
    console.log("itt user")
    const self = this;
    self.pool.query(schemas.createUsersTableSQL,
        (err, data) => {
            if (err) {
                console.log('Error creating user tables', err);
                return _callback(err)
            }
            return _callback(true)
        }
    );
}

Db.prototype.createDeviceTable = function (_callback) {
    console.log("itt device")
    const self = this;
    self.pool.query(schemas.createDevicesTableSQL,
        (err, data) => {
            if (err) {
                console.log('Error creating device tables', err);
                return _callback(err)
            }
            return _callback(true)
        }
    );
}

