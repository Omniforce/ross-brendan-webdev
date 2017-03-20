var mongoose = require("mongoose");
var db = require("../util/db.js");

mongoose.connect(db.url);
mongoose.Promise = require('q').Promise;

var userModel = require('./user/user.model.server.js');
var websiteModel = require('./website/website.model.server.js');
var pageModel = require('./page/page.model.server.js');
var widgetModel = require('./widget/widget.model.server.js');

var model = {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel
};

module.exports = model;
