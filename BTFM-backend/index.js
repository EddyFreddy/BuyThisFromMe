const schedule = require('node-schedule');
const serve = require('koa-static');
const Koa = require('koa');
const conf = require('./config.js');
const router = require('./router.js');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const app = new Koa();

const twitterController = require('./controllers/twitterController.js');

const updateList = schedule.scheduleJob('*/1 * * * *', function () {
  twitterController.postTweets();
});

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(4000);
