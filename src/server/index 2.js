const express = require('express'); 
const app = express(); 
const MongoClient = require('mongodb').MongoClient; 
const bodyParser = require('body-parser'); 
const path = require('path'); 

require('dotenv').config(); 


let database; 

app.use(bodyParser.json()); 
// Папка где хранятся js/css файлы 
app.use(express.static(path.join(__dirname, 'public')));
// Папка, где будут хранится фотографии 
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
// Получить данные по контактам - подумать, как объединить таблицы 
/* В случае поиска для объединения таблиц использовать ?
db.<databasename1>.find({_id: db.<databasename2>.find()[0].company_id})*/
app.get('/api/contacts', (req, res) => {
	const contactsCollection = database.collection('contacts');
	const departmentsCollection = database.collection('departments'); 
	const jobTitlesCollection = database.collection('jobTitles');

	contactsCollection.aggregate([
	{ $lookup: 
		{
			from: departmentsCollection,
			localField: 'departmentID',
			foreignField: 'departmentID', 
			as: 'contactDetails'
		}

	}
	]).toArray((err, docs) => {
		return res.json(docs);
	});
}); 

// Получить данные по отделам 
app.get('/api/departments', (req, res) => {
	const departmentsCollection = database.collection('departments'); 
	departmentsCollection.find({}).toArray((err, docs) => {
		return res.json(docs);
	})
});

// Получить данные по должностям 
app.get('/api/jobTitles', (req, res) => {
	const jobTitlesCollection = database.collection('jobTitles');
	jobTitlesCollection.find({}).toArray((err, docs) => {
		return res.json(docs);
	}) 
})

app.post('/api/contacts', (req, res) => {
	const user = req.body; 
	const contactsCollection = database.collection('contacts');
	contactsCollection.insertOne(user, (err, r) => {
		if (err) {
			return res.status(500).json({ error: 'Error inserting new record'}); 
		}

		const newContact = r.ops[0]; 

		return res.status(201).json(newContact); 
	})
});

// В случае, если запрос пользователя не будет совпадать ни с одним из запрошенных выше
app.get('*', (req, res) => {
	return res.sendFile(path.join(__dirname, 'public/index.html')); 
});

MongoClient.connect(process.env.DB_CONN, (err, db) => {
	console.log('connected to mongodb...');

	app.listen(3000, () => {
		database = db; 
		console.log('listening on port 3000...'); 
	}) 
});


