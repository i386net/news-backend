const Article = require('../models/article');

const createArticle = (req, res, next) => {
  const {
    source, author, title, description, url, urlToImage, publishedAt, content,
  } = req.body;
  Article.create({
    source, author, title, description, url, urlToImage, publishedAt, content, user: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => next(err));
};

const getArticles = (req, res, next) => {
  Article.find({ user: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports = { createArticle, getArticles };
