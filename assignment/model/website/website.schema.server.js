var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var websiteSchema = new Schema({
    _user:       { type: Schema.Types.ObjectId, ref: 'User' },
    name:        String,
    description: String,
}, {
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
});

module.exports = websiteSchema;
