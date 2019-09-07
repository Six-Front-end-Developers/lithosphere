export function readEarthquakes() {
	let earthquakes = []
	const db = require('better-sqlite3')('foobar.db', options)
	const row = db.prepare('SELECT * FROM earthquakes').all()
	print(row)

	// TODO(Jmmxp): Construct an Earthquake instance from the rows, return list of Earthquakes 
	return row
}
