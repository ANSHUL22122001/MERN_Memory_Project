var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    creator:{
        type: String,
        required: true
    },
   title:{
       type: String,
       required: true
   },
   message:{
       type: String,
       required: true
   },
   tags: [String],
   selectedFile:{
       type: String,
       required: true
   },
   likeCount:{
    type: Number,
    default: 0
   }
},{
    timestamps: true
});

var postMessage = mongoose.model('postMessage', postSchema);

module.exports = postMessage;