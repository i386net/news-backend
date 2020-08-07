const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors/errors');
const { statusMessage } = require('../configs/messages');

const createArticle = (req, res, next) => {
  const {
    source, author, title, description, url, urlToImage, publishedAt, content,
  } = req.body;
  Article.create({
    source, author, title, description, url, urlToImage, publishedAt, content, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => next(err));
};

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(new NotFoundError(statusMessage.articleNotFoundError))
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        return Article.findByIdAndDelete(article._id)
          .orFail(new NotFoundError('not found'))
          .then((deletedArticle) => res.send({
            data: deletedArticle,
            message: statusMessage.articleDeleted,
          }))
          .catch(next);
      }
      return next(new ForbiddenError(statusMessage.articleForbiddenError));
    })
    .catch(next);
};

module.exports = { createArticle, getArticles, deleteArticle };
