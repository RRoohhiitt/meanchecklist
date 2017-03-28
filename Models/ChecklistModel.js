var db = require('mongoose');
var ChecklistSchema = new db.Schema({
  requirement: String,
  contact_p: String,
  status: {
      type:Number,
      default:0
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = db.model("ChecklistModel", ChecklistSchema);