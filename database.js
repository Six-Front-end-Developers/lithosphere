export function readEarthquakes() {
	const db = require('better-sqlite3')('earthquake.db', null)
	const rows = db.prepare('SELECT DISTINCT * FROM earthquakes ORDER BY time ASC').all()
	return rows
}
