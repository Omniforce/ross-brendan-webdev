var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    _website:    { type: Schema.Types.ObjectId, ref: 'Website' },
    name:        String,
    title:       String,
    description: String,
    widgets:     [{ type: Schema.Types.ObjectId, ref: 'Widget' }]
}, {
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
});

module.exports = pageSchema;
