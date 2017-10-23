console.log('searching twitter');

const Twit = require('twit');
const config = require('../config');
const T = new Twit(config);

let itemList = [];

let params = {
  q: `#buythisfromme since:2011-07-11`,
  count: 10
};

module.exports = async () => {
  await T.get('search/tweets', params, gotData);
  return itemList;
  // itemList;
};

function gotData (err, data, response) {
  let tweets = data.statuses;
  // console.log(ctx.params);
  // console.log(data.statuses);

  for (let i = 0; i < tweets.length; i++) {

    let Seller = tweets[i].user;
    let Location = tweets[i].user.location;
    let Photo;

    if (tweets[i].place !== null) {
      Location = tweets[i].place.full_name;
    }

    if (tweets[i].entities.media) {
      Photo = tweets[i].entities.media[0].media_url;
    }

    itemList[i] = {
      seller: Seller,
      text: tweets[i].text,
      location: Location,
      media: Photo,
      created_at: tweets[i].created_at,
      status: tweets[i]
    };
  }

  // console.log('THIS IS THE TWEET LIST:', tweets);

  // console.log('THIS IS THE ITEM LIST OBJECT:\n' , itemList);
  return itemList;
}
