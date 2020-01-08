module.exports = {
  createDevicesTableSQL: `CREATE TABLE IF NOT EXISTS devices(
    token TEXT PRIMARY KEY UNIQUE, 
    user_id VARCHAR(40))`,

    deleteDeviceTableSQL: 'DROP table devices',

   
    creatReportsSQL: `CREATE TABLE IF NOT EXISTS reports(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    content TEXT,
    user_id VARCHAR(30))`,

    deleteReportsTableSQL: 'DROP table reports',
}
