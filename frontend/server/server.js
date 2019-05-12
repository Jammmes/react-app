const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/film/:id', (req, res) => {
      const actualPage = '/film';
      const queryParams = { filmId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/', (req, res) => {
      const actualPage = '/main';
      app.render(req, res, actualPage)
    });

    server.get('/search/result', (req, res) => {
      const actualPage = '/search';
      app.render(req, res, actualPage)
    });

    server.get('*', (req, res) => {
      const notFound = '/404';
      app.render(req, res, notFound);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    })
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });