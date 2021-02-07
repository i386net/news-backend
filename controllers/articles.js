const mongoose = require('mongoose');
const Article = require('../models/article');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../errors/errors');
const { statusMessage } = require('../configs/messages');

const createArticle = (req, res, next) => {
  const newArticle = { ...req.body };
  Article.create({
    ...newArticle,
    owner: req.user._id,
  })
    .then((article) => res.send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      link: article.link,
      date: article.date,
      source: article.source,
      image: article.image,
    }))
    .catch(next);
};

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.articleId)) {
    return Article.findById(req.params.articleId)
      .select('owner')
      .orFail(new NotFoundError(statusMessage.articleNotFoundError))
      .then((article) => {
        if (article.owner.toString() === req.user._id) {
          return Article.deleteOne(article)
            .orFail(new NotFoundError(statusMessage.articleNotFoundError))
            .then((deletedArticle) => res.send({
              data: deletedArticle,
              message: statusMessage.articleDeleted,
            }))
            .catch(next);
        }
        return next(new ForbiddenError(statusMessage.articleForbiddenError));
      })
      .catch(next);
  }
  return next(new BadRequestError(statusMessage.articleBadRequestError));
};

module.exports = {
  createArticle,
  getArticles,
  deleteArticle,
};
