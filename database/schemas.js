module.exports = {
  createDevicesTableSQL: `CREATE TABLE IF NOT EXISTS devices(
    token TEXT PRIMARY KEY UNIQUE, 
    user_id VARCHAR(40))`,

    deleteDeviceTableSQL: 'DROP table devices',

   
    creatTodosSQL: `CREATE TABLE IF NOT EXISTS todo(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    content TEXT,
    category SMALLINT,
    user_id VARCHAR(30))`,

    deleteTodosTableSQL: 'DROP table todo',
}
