# movies-explorer-api
Бэкенд часть для дипломного проекта [ссылка тут](https://api.movies.marinich.nomoredomains.club/)

Роуты:
 - POST /signup - регистрация нового пользователя
 - POST /signin - авторизация пользователя
 - POST /signout - разлогин пользователя
 - GET /users/me - получить инфо текущего пользователя
 - PATCH /users/me - обновить сведения о пользователе (email, имя)
 - GET /movies - получить список фильмов текущего пользователя
 - POST /movies - добавить фильм
 - DELETE /movies/:id - удалить фильм с :id
