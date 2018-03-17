const mysql = require('mysql');
const contacts = require('./contacts'); 
const departments = require('./departments'); 
const jobTitles = require('./jobTitles');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "company1"
});
	
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  console.log(contacts);
/*
  // Создаем таблицу контактов 
  let createTableContacts = "CREATE TABLE IF NOT EXISTS contacts (contact_id INT(10) AUTO_INCREMENT PRIMARY KEY, lastname VARCHAR(255), firstname VARCHAR(255), patronymic VARCHAR(255), gender CHAR(1), photo_url VARCHAR(255), contact_job_title_ID TINYINT(4), contact_departmentID TINYINT(4), permissions TEXT(1000))"; 
  con.query(createTableContacts, function (err, result) {
    if (err) throw err;
    console.log("Table contacts created");
  });

  // Создаем таблицу отделов 
  let createTableDepartments = "CREATE TABLE IF NOT EXISTS departments (department_id TINYINT(4) AUTO_INCREMENT PRIMARY KEY, department_name VARCHAR(255));"; 
  con.query(createTableDepartments, function (err, result) {
    if (err) throw err;
    console.log("Table departments created");
  });

  // Создаем таблицу должностей 
  let createTableJobTitles = "CREATE TABLE IF NOT EXISTS jobTitles (jobTitle_id TINYINT(4) AUTO_INCREMENT PRIMARY KEY, jobTitle_name VARCHAR(255));"; 
  con.query(createTableDepartments, function (err, result) {
    if (err) throw err;
    console.log("Table jobTitles created");
  });
*/
  // Добавляем данные в таблицы 
	let insertInitialIntoContacts = "INSERT INTO contacts (lastname, firstname, patronymic, gender, photo_url, contact_job_title_ID, contact_departmentID, permissions) VALUES ?";
 	forEach(contacts). 
 	let values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

