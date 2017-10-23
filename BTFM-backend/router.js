const Router = require('koa-router');
const router = new Router();

const twitterController = require('./controllers/twitterController.js');

router.get('/recent', twitterController.getItems);

router.get('/items/:item', twitterController.searchItems);

module.exports = router;
