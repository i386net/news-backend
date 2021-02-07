# NewsExplorer-backend
##### API для аутентификации пользователей и сохранения статей

Бекэнд дипломного проекта [**Яндекс** _Практикума_](https://praktikum.yandex.ru)

**Технологии**: Node.JS, Express, MongoDB, Winston

##### Адрес сервера:
* `130.193.58.67`
##### API принимает запросы по ссылкам:
* `http://api.news.i386.me`
* `https://api.news.i386.me`

## Развертывание

- Установить [Node.JS](https://nodejs.org/en/)
- Скопировать репозиторий: `git@github.com:i386net/news-backend.git`  
- Установить зависимости `npm install`

## Запуск

- В режиме разработки: `npm run dev`  с `hot realod`
- В режиме сервера: `npm run start` 

## Работа с API

| ЗАПРОС | ОТВЕТ | 
| :---         |     :---       |  
| POST `api.news.i386.me/signup`   | Регистрация нового пользователя     |
| POST `api.news.i386.me/signin`   | Логин     |
| GET `api.news.i386.me/users/me`   | Получение информации о пользователе     |
| GET `api.news.i386.me/articles`   | JSON-список всех статей     | 
| POST `api.news.i386.me/articles`     | Создание статьи. В ответ API должно возвращать 200 статус ответа и JSON с данными созданой статьи       | 
| DELETE `api.news.i386.me/articles/5f0179c9602fb4280b465bd6`     | Удаление статьи. В ответ API должно возвращать 200 статус ответа и JSON с данными удаленной статьи       | 
| Несуществующий адрес     | `{ "message": Сообщение об ошибке }`       | 

