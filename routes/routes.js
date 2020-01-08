const reportFunctions = require('../controllers/report.js');


module.exports = function (app, pool, database) {

	app.get('/', function (req, res) {
		res.json({ "message": "Welcome to report sender server application." });
	});

	app.get('/api/reports', (req, res) => { console.log("get: "+ req.url); reportFunctions.gets(req, res, pool); });
	app.post('/api/reports/create', (req, res) => { console.log("post: "+ req.url); reportFunctions.create(req, res, pool); });
	app.post('/api/reports/delete', (req, res) => { console.log("post: "+ req.url); reportFunctions.delete(req, res, pool); });
	app.post('/api/reports/update', (req, res) => { console.log("post: "+ req.url); reportFunctions.update(req, res, pool); });

	app.post('/api/reports/notify', (req, res) => { console.log("post: "+ req.url); reportFunctions.notify(req, res, pool); });
	app.post('/api/notification/register', (req, res) => { console.log("post: "+ req.url); reportFunctions.notifyregister(req, res, pool); });

	/**
	 * Just for development  
	 * Drop tables and Create 
	 */

	app.get('/api/database/create', (req, res) => { console.log("get : "+ req.url); database.create((resp) => { res.send(resp) }) });
	app.get('/api/database/drop', (req, res) => { console.log("get : "+ req.url); database.drop((resp) => { res.send(resp) }) });

	app.get('/api/database/create/storedproc', (req, res) => { console.log("get : "+ req.url); database.createGetFavoriteStoredPRocedureTable((resp) => { res.send(resp) }) });
	app.get('/api/database/drop/storedproc', (req, res) => { console.log("get : "+ req.url); database.deleteStoredProcedure('DROP function get', (resp) => { res.send(resp) }) });

	app.get('/api/database/altertable', (req, res) => { console.log("get : "+ req.url); database.altertableUsers((resp) => { res.send(resp) }) });
}