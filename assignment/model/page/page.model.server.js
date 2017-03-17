var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server.js');
var Page = mongoose.model('Page', pageSchema);

var api = {
    createPage: createPage,
    findAllPagesForWebsite: findAllPagesForWebsite,
    findPageById: findPageById,
    updatePage: updatePage,
    deletePage: deletePage,
};

module.exports = api;

function createPage(websiteId, page) {
    var newPage = new Page(page);
    newPage._website = websiteId;

    return newPage.save();
}

function findAllPagesForWebsite(websiteId) {
    return Page.find({ _website: websiteId });
}

function findPageById(pageId) {
    return Page.findById(pageId);
}

function updatePage(pageId, page) {
    return Page.findByIdAndUpdate(pageId, page, { new: true });
}

function deletePage(pageId) {
    return Page.findByIdAndRemove(pageId);
}
