var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server.js');
var Page = mongoose.model('Page', pageSchema);

var api = {
    createPage: createPage,
    findAllPagesForWebsite: findAllPagesForWebsite,
    findPageById: findPageById,
    updatePage: updatePage,
    deletePage: deletePage,
    addWidget: addWidget,
    deleteWidget: deleteWidget,
    findPageByIdWithWidgets: findPageByIdWithWidgets,
    reorderWidget: reorderWidget
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

function addWidget(pageId, widgetId) {
    var change = { $push: { widgets: widgetId } }
    return Page.findByIdAndUpdate(pageId, change, { new: true });
}

function deleteWidget(pageId, widgetId) {
    var change = { $pull: { widgets: widgetId } }
    return Page.findByIdAndUpdate(pageId, change, { new: true });
}

function findPageByIdWithWidgets(pageId) {
    return Page.findById(pageId).populate('widgets').select('widgets -_id');
}

function reorderWidget(pageId, start, end) {
    return Page.findById(pageId).then(function(page) {
        var widgets = page.widgets;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);

        page.widgets = widgets;
        return page.save();
    });
}
