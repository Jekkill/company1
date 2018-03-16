require('dotenv').config();

const contacts = require('./contacts');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt'); 
console.log(process.env.DB_CONN);
function seedCollection(collectionName, initialRecords) {
	MongoClient.connect(process.env.DB_CONN, (err, db) => {
		console.log('connected to mongodb...');
		console.log(db); 
		console.log(err);
		const collection = db.collection(collectionName); 
		collection.remove();

		initialRecords.forEach((item) => {
			if (item.password) {
				item.password = bcrypt.hashSync(item.password, 10);
			}
		}); 

		collection.insertMany(initialRecords, (err, result) => {
			console.log(`${result.insertedCount} records inserted`);
			console.log('closing connection...');
			db.close(); 
			console.log('done!');
		})
	})
}

seedCollection('contacts', contacts);