Приложение для записи и получения заявок из базы данных.

На серверсайде использован шаблон MVC.
  
Дамп базы данных: '/api/db/partnerkin_db_dump.sql'.

При выборе в селекторе варианта "Другое" появляется инпут куда вы можете записать свой вариант.

Путь к JSON-объекту всех отправленных заявок: '/api/data/get?auth_key=junior_test'
(При другом значении параметра запроса или его отсутствии выводится сообщение "You have no access").

Деплоил на OpenServer.
