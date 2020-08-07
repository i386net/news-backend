# NewsExplorer-backend
##### API для аутентификации пользователей и сохранения статей

Бекэнд дипломного проекта Яндекс Практикума

**Технологии**: Node.JS, Express, MongoDB, Winston

##### Адрес сервера:

IP: 130.193.58.67

## Развертывание

- Установить [Node.JS](https://nodejs.org/en/)
- Скопировать репозиторий: `git@github.com:i386net/news-backend.git`  
- Установить зависимости `npm install`

## Запуск

- В режиме разработки: `npm run dev` запускает сервер на `localhost:3000` с `hot realod`
- В режиме сервера: `npm run start` запускает сервер на `localhost:3000`

## Работа с API

| ЗАПРОС | ОТВЕТ | 
| :---         |     :---       |  
| POST `localhost:3000/signup`   | Регистрация нового пользователя     |
| GET `localhost:3000/signin`   | Логин     |
| PATCH `http://localhost:3000/users/me`   | Получение информации о пользователе     |
| GET `localhost:3000/articles`   | JSON-список всех статей     | 
| POST `localhost:3000/articles`     | Создание статьи. В ответ API должно возвращать 200 статус ответа и JSON с данными созданой статьи       | 
| DELETE `localhost:3000/articles/5f0179c9602fb4280b465bd6`     | Удаление статьи. В ответ API должно возвращать 200 статус ответа и JSON с данными удаленной статьи       | 
| Несуществующий адрес     | `{ "message": Сообщение об ошибке }`       | 

