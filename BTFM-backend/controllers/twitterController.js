console.log('searching twitter');

const twitAPI = require('../utils/twit-api-client.js');
const itemModel = require('../models/listing.js');

exports.getItems = async ctx => {
  let tweets;
  try {
    tweets = await itemModel.getAll();
    ctx.status = 201;
  } catch (e) {
    ctx.throw();
  }
  ctx.body = tweets;
};

exports.searchItems = async ctx => {
  // console.log('searching for items');
  // console.log('this is CTX PARAMS:', ctx.params.item);
  let tweets;
  let searchedItems = [];
  tweets = await itemModel.getAll();
  for (let i = 0; i < tweets.length; i++) {
    if (tweets[i].text.includes(ctx.params.item)) searchedItems.push(tweets[i]);
  }
  ctx.status = 201;
  ctx.body = searchedItems;
};


exports.postTweets = async () => {
  const tweets = await twitAPI();
  // itemModel.dropItems();
  let checkTweets = await itemModel.getAll();
  // console.log('THIS IS CHECK TWEETS', checkTweets);
  let check = false;
  // console.log('THIS IS THE CHECKTWEETS.LENGTH:',checkTweets.length);
  for (let i = 0; i < tweets.length; i++) {

    // console.log('THIS IS A TWEET', tweets[i].text);
    for (let i =0; i < checkTweets.length; i++) {
      if (checkTweets[i].text === tweets[i].text) check = true;
    }
    if (tweets[i].text.includes('RT @')) check = true;
    if (!check) await itemModel.postItems(tweets[i]);
    // itemModel.postItems(tweets[i]);
    check = false;
  }
};
