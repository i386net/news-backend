const joiMessage = {
  incorrectURL: 'Некорректная ссылка',
  urlRequired: 'Ссылка обязательное поле',
  emptyURL: 'Ссылка не может быть пустой',
  incorrectFormatID: 'Некорректный формат id',
  userNameString: 'Имя должно быть строкой',
  usernameRequired: 'Имя обязательное поле',
  userNameMin: 'В имени должно быть не менее {#limit} знаков',
  userNameMax: 'В имени должно быть не более {#limit} знаков',
  userNameEmpty: 'Имя не может быть пустым',
  emptyParam: 'Поля не могут быть пустыми',
  requiredParam: 'Все поля обязательные',
  emailNotValid: 'Данный адрес не является электронной почтой',
  passwordAlphaNum: 'Пароль должен содержать буквы и/или цифры',
  passwordMin: 'В пароле должно быть не менее {#limit} знаков',
  passwordMax: 'В пароле должно быть не более {#limit} знаков',

};
const statusMessage = {
  dbConnectionError: 'Невозможно установить соединение с базой данных',
  resourceNotFoundError: 'Ресурс не найден',
  userNotFound: 'Пользователь не найден',
  userLoginBusy: 'Этот логин занят',
  userIncorrectData: 'Переданы некорректные данные',
  userWelcomeMessage: 'Добро пожаловать <(￣︶￣)>',
  userAuthError: 'Ошибка авторизации (×﹏×)',
  articleNotFoundError: 'Статья с этим id не найдена',
  articleForbiddenError: 'Вы не можете удалять чужие новости! ＼(º □ º l|l)/',
  articleDeleted: 'Успешно удалена! ＼(￣▽￣)／',

};

module.exports = { joiMessage, statusMessage };
