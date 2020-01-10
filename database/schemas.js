module.exports = {
  createDevicesTableSQL: `CREATE TABLE IF NOT EXISTS devices(
    token TEXT PRIMARY KEY UNIQUE, 
    user_id VARCHAR(40))`,

  deleteDeviceTableSQL: 'DROP table devices',

  createUsersTableSQL: `CREATE TABLE IF NOT EXISTS users(
    user_id TEXT PRIMARY KEY UNIQUE, 
    displayName VARCHAR(40),
    photoUrl TEXT)`,

  deleteUsersTableSQL: 'DROP table users',

  creatTodosSQL: `CREATE TABLE IF NOT EXISTS todo(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    content TEXT,
    category SMALLINT,
    user_id VARCHAR(30))`,

  deleteTodosTableSQL: 'DROP table todo',
}
