module.exports = {
  createDevicesTableSQL: `CREATE TABLE IF NOT EXISTS devices(
    token TEXT PRIMARY KEY, 
    name VARCHAR(40), 
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_user_device FOREIGN KEY (user_id) REFERENCES users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE)`,

    deleteDeviceTableSQL: 'DROP table devices',

   
    creatReportsSQL: `CREATE TABLE IF NOT EXISTS reports(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) UNIQUE,
    content TEXT,
    user_id VARCHAR(30))`,

    deleteReportsTableSQL: 'DROP table reports',
}
