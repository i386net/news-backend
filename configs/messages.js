const joiMessage = {
  nameMin: 'Название должно быть не менее {#limit} знаков',
  nameMax: 'Название должно быть не более {#limit} знаков',
  nameEmpty: 'Название не может быть пустым',
  incorrectURL: 'Некорректная ссылка',
  urlRequired: 'Ссылка обязательное поле',
  emptyURL: 'Ссылка не может быть пустой',
  incorrectFormatID: 'Некорректный формат id',
  userNameString: 'Имя должно быть строкой',
  usernameRequired: 'Имя обязательное поле',
  userNameMin: 'В имени должно быть не менее {#limit} знаков',
  userNameMax: 'В имени должно быть не более {#limit} знаков',
  userNameEmpty: 'Имя не может быть пустым',
  emptyParam: 'Поле не может быть пустым',
  requiredParam: 'Обязательное поле',
  emailNotValid: 'Данный адрес не является электронной почтой',

};
const statusMessage = {
  dbConnectionError: 'Невозможно установить соединение с базой данных',
  resourseNotFoundError: 'Ресурс не найден',
  userLoginBusy: 'Этот логин занят',
  userIncorrectData: 'Переданы некорректные данные',
  userWelcomeMessage: 'Добро пожаловать <(￣︶￣)>',
  userAuthError: 'Ошибка авторизации (×﹏×)',

};

module.exports = { joiMessage, statusMessage };
