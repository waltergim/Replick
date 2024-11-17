//  exportaciones 
const {Schema, mongoose} = require('mongoose')

// creamos el schema
const PostSchema = new Schema({
    title: {type: String, required: true},
    subtitle : {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true},
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    date : {type: Date, default: Date.now}
    })


// exportamos el schema
module.exports = mongoose.model('Post', PostSchema)