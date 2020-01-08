'use strict';

const schemas = require('./schemas');


const Db = module.exports = function (_pool) {
    this.pool = _pool;
}

Db.prototype.create = function (callback) {
    console.log("itt")
    const self = this
    self.createReportTable((success) => {
        console.log(success);
        if (success) {
            self.createDeviceTable((success) => {
                console.log(success);
                return callback(success);
            })
        } else {
            return callback(success);
        }
    })
}

Db.prototype.drop = function (__callback) {
    const self = this;
    self.deleteTable(schemas.deleteReportsTableSQL, (success) => {
        if (success) {
            self.deleteTable(schemas.deleteDeviceTableSQL, (success) => {
                return __callback(success);
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


Db.prototype.createReportTable = function (_callback) {
    console.log("itt reports")
    const self = this;
    self.pool.query(schemas.creatReportsSQL,
        (err, data) => {
            if (err) {
                console.log('Error creating reports tables', err);
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
                console.log('Error creating reports tables', err);
                return _callback(err)
            }
            return _callback(true)
        }
    );
}

