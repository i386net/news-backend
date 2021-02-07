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
  unauthorizedError: 'Необходима авторизация (凸ಠ益ಠ)凸',
  resourceNotFoundError: 'Ресурс не найден',
  userNotFound: 'Пользователь не найден',
  userLoginBusy: 'Этот логин занят',
  userIncorrectData: 'Переданы некорректные данные',
  userWelcomeMessage: 'Добро пожаловать <(￣︶￣)>',
  userAuthError: 'Ошибка авторизации (×﹏×)',
  articleNotFoundError: 'Статья с этим id не найдена',
  articleForbiddenError: 'Вы не можете удалять чужие новости! ＼(º □ º l|l)/',
  articleDeleted: 'Успешно удалена! ＼(￣▽￣)／',
  articleBadRequestError: 'Некорректный формат id',
  minLengthError: 'Минимальная длина имени 2 символа',
  maxLengthError: 'Максимальная длина имени 30 символов',
  wrongAuthDataError: 'Неверная почта или пароль',
  conflictError: 'Пользователь с таким адресом уже существует.',
  incorrectMail: (props) => `${props.value} некорректная почта`,
  incorrectURL: (props) => `${props.value} некорректная ссылка`,
};
const limiter = {
  loginLimiter: 'Слишком много запросов с этого IP, попробуйте снова через час. (￣o￣) zzZZzzZZ',
  apiLimiter: 'Слишком много запросов с этого IP, попробуйте снова через 15 минут. (￣o￣) zzZZzzZZ',
};

module.exports = { joiMessage, statusMessage, limiter };
