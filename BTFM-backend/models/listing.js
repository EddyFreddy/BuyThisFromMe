'use strict';

const db = require('../db.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema ({
  seller: Object,
  text: String,
  location: String,
  media: String,
  created_at: Date,
  status: Object
});

const ItemModel = mongoose.model('Item', Item);

exports.getAll = () => {
  return ItemModel.find();
};

exports.search = (item) => {

};

exports.dropItems = () => {
  ItemModel.collection.drop();
};

exports.postItems = (data) => {
  const newItem = new ItemModel ({
    seller: data.seller,
    text: data.text,
    location: data.location,
    media: data.media,
    created_at: data.created_at,
    status: data.status
  });
  // console.log(data);
  // console.log('THIS IS THE NEW ITEM:', newItem);
  newItem.save();
};
