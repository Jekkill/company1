-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Мар 19 2018 г., 10:54
-- Версия сервера: 10.1.16-MariaDB
-- Версия PHP: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `company1`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(10) UNSIGNED NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `patronymic` varchar(255) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `contact_job_title_ID` tinyint(4) UNSIGNED DEFAULT NULL,
  `contact_departmentID` tinyint(4) UNSIGNED DEFAULT NULL,
  `permissions` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `contacts`
--

INSERT INTO `contacts` (`contact_id`, `lastname`, `firstname`, `patronymic`, `gender`, `photo_url`, `contact_job_title_ID`, `contact_departmentID`, `permissions`) VALUES
(1, 'Иванов', 'Иван', 'Иванович', 'М', '/profiles/eric-ortiz.jpg', 1, 1, 'Создание депозита'),
(2, 'Петров', 'Петр', 'Петрович', 'М', '/profiles/carl-murray.jpg', 3, 1, 'Создание депозита,Закрытие депозита,Одобрение кредита,Одобрение открытия счета'),
(3, 'Сидорова', 'Юлия', 'Михайловна', 'Ж', '/profiles/jennifer-mendoza.jpg', 3, 2, '"permissionOpenDeposit", "permissionCloseDeposit", "permissionApproveCredit"'),
(4, 'Михеев', 'Антон', 'Олегович', 'М', '/profiles/david-crawford.jpg', 2, 2, 'Создание депозита,Закрытие депозита,Одобрение кредита,Одобрение открытия счета'),
(18, 'Иванов', 'Алексей', 'Михайлович', 'М', '/profiles/george-carter.jpg', 1, 2, 'Создание депозита'),
(19, 'Мещерекова', 'Ирина', 'Романовна', 'Ж', '/profiles/michelle-caster.jpg', 1, 2, 'Создание депозита'),
(20, 'Лебедева', 'Татьяна', 'Анатольевна', 'Ж', '/profiles/diane-johnston.jpg', 1, 2, 'Создание депозита');

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `department_id` tinyint(4) UNSIGNED NOT NULL,
  `department_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`) VALUES
(1, 'Департамент управления персоналом'),
(2, 'Департамент управления рисками');

-- --------------------------------------------------------

--
-- Структура таблицы `job_titles`
--

CREATE TABLE `job_titles` (
  `job_title_id` tinyint(4) UNSIGNED NOT NULL,
  `job_title_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `job_titles`
--

INSERT INTO `job_titles` (`job_title_id`, `job_title_name`) VALUES
(1, 'Секретарь'),
(2, 'Начальник'),
(3, 'Директор');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `contact_job_title_ID` (`contact_job_title_ID`),
  ADD KEY `contact_departmentID` (`contact_departmentID`);

--
-- Индексы таблицы `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Индексы таблицы `job_titles`
--
ALTER TABLE `job_titles`
  ADD PRIMARY KEY (`job_title_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `job_titles`
--
ALTER TABLE `job_titles`
  MODIFY `job_title_id` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`contact_job_title_ID`) REFERENCES `job_titles` (`job_title_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`contact_departmentID`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
