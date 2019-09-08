export function readEarthquakes() {
	const db = require('better-sqlite3')('earthquake.db', null)
	const rows = db.prepare('SELECT * FROM earthquakes').all()
	return rows
}
