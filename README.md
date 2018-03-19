# Company1employees

# Общая информация 

Проект создан для реализации CRUD схемы по получению / добавлению / изменению и и удалению информации о пользователях. 


# Серверная часть

Сервер реализован на Node.js с использованием библиотеки Express (основной скрипт для работы - index.js - находится в папке server).
Находится в папке src/server.  
В качестве базы данных использована MySQL (порт 3306). Скрипт для добавления первоначальной информации таблиц в базу данных находится в папке server/data. В качестве основной таблицы - таблица Contact, которая содержит следующую информацию: фамилия, имя, отчество, пол, путь к фотографии на сервере, должность, отдел, а также допустимые действия сотрудника.  
Также на сервере организовано хранилище фотографий (находятся в папке server/profiles). 

# Клиентская часть

Клиентская часть реализована на Angular 5 с использованием Material Design в качестве основной библиотеки. Находится в папке src/client.  Логика клиентской части реализована на языке typescript, стили на языке css, разметка - html. 

Основной компонент приложения находится в папке table - это вся информация по сотрудникам в виде таблицы. Помимо таблицы здесь реализован фильтр по должностям, отделам и фамилии. 

Для добавления нового сотрудника - компонент add-contact - представляет из себя форму для создания нового сотрудника. 

Для изменения информации о сотруднике - компонент contact - также представляет из себя форму, но уже со значениями конкретного сотрудника. 

В папке menu - верхняя часть страницы, из которой можно совершить навигацию - добавить нового сотрудника или вернуться на главную страницу. 

В папке shared находится модель Contact, которая описывает всех сотрудников. Там же реализован сервис api - для удобства работы с методами (get, post, create, delete). 

Более подробную информацию Вы всегда можете найти внутри приложения. 

# NPM - команды 

Для более быстрой сборки проекта, его тестирования а также разработки были написаны следующие команды:

Для полной сборки: серверной части проекта - start:server, клиентской - build, серверной и клиентской - start.

Для быстрой сборки проекта при разработке: серверной - watch:server,
клинтской - watch:client, серверной и клиентской - watch. 




