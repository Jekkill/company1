const express = require('express'); 
const app = express(); 
const mysql = require('mysql'); 
const bodyParser = require('body-parser'); 
const path = require('path'); 
const formidable = require('formidable'); 
const fs = require('fs');

// Задаем данные по соединению в mysql, порт 3306 по умолчанию 
let con = mysql.createConnection({
	host: 'localhost', 
	user: 'root', 
	password: '',
	database: "company1" 
}); 

// Теперь соединяемся с базой данных 
con.connect(function(err) {
	if (err) throw err; 
	console.log('connection to the mysql created...');
	app.listen(3000, () => {
		console.log('listening on port 3000...'); 
	});
});


app.use(bodyParser.json()); 
// Папка где хранятся js/css файлы 
app.use(express.static(path.join(__dirname, 'public')));
// Папка, где будут хранится фотографии 
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));

// Формируем главную таблицу, получаем данные по сотрудникам 
app.get('/api/contacts', (req, res) => {
	let query = `  SELECT contact_id, lastname, firstname, patronymic, gender, photo_url, department_name, job_title_name 
				   FROM contacts 
				   LEFT JOIN departments ON department_id = contact_departmentID
				   LEFT JOIN job_titles ON job_title_id = contact_job_title_id;  `;
	con.query(query, function (err, result, fields) {
	    if (err) throw err;
	    let json = JSON.parse(JSON.stringify(result)); 
	    res.send(json);
	}); 
}); 

// Получить данные по отделам 
app.get('/api/departments', (req, res) => {
	let query = `  SELECT department_id, department_name 
				   FROM departments;`
	con.query(query, function (err, result, fields) {
	    if (err) throw err;
	    let json = JSON.parse(JSON.stringify(result)); 
	    res.send(json);
	}); 
});

// Получить данные по должностям 
app.get('/api/jobTitles', (req, res) => {
	let query = `  SELECT job_title_id, job_title_name 
				   FROM job_titles;`
	con.query(query, function (err, result, fields) {
	    if (err) throw err;
	    let json = JSON.parse(JSON.stringify(result)); 
	    res.send(json);
	}); 
});

// Добавить нового пользователя в базу данных 
app.post('/api/contacts', (req, res) => {
  		const user = req.body; 
  		console.log(user.lastname);
  		let query = `  INSERT INTO contacts (lastname, firstname, patronymic, gender, photo_url, contact_job_title_ID, contact_departmentID, permissions)
				   VALUES ('${user.lastname}', '${user.firstname}', '${user.patronymic}', '${user.gender}', '${user.photo_url}', ${user.job_title_name}, ${user.department_name}, '${user.permissions}');`
		console.log(query);
		con.query(query, function (err, result, fields) {
	    	if (err) {
	    		return res.status(500).json({ error: 'Error inserting new record!' }); 
	    	}
	    	const newContact = result;
	    	return res.status(201).json(newContact);
		});
});

// Редактировать информацию о пользователе 

app.post('/api/contacts/:id', (req, res) => {
  		const user = req.body; 
  		console.log(user.lastname);
  		var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  		let query = `   UPDATE  contacts 
  						SET 
  						lastname = '${user.lastname}', 
  						firstname = '${user.firstname}', 
  						patronymic = '${user.patronymic}', 
  						gender = '${user.gender}', 
  						photo_url = '${user.photo_url}', 
  						contact_job_title_ID = ${user.job_title_name}, 
  						contact_departmentID = ${user.department_name}, 
  						permissions = '${user.permissions}'
  						WHERE contact_id = ${id};`
		console.log(query);
		con.query(query, function (err, result, fields) {
	    	if (err) {
	    		return res.status(500).json({ error: 'Error inserting new record!' }); 
	    	}
	    	const newContact = result;
	    	return res.status(201).json(newContact);
		});
});

// В случае, если запрос пользователя не будет совпадать ни с одним из перечисленных выше
app.get('*', (req, res) => {
	return res.sendFile(path.join(__dirname, 'public/index.html')); 
});
