require('dotenv').config();

const contacts = require('./contacts');
const departments = require('./departments'); 
const jobTitles = require('./jobTitles');

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

		collection.insertMany(initialRecords, (err, result) => {
			console.log(`${result.insertedCount} records inserted`);
			console.log('closing connection...');
			db.close(); 
			console.log('done!');
		})
	})
}

seedCollection('contacts', contacts);
seedCollection('departments', departments); 
seedCollection('jobTitles', jobTitles);