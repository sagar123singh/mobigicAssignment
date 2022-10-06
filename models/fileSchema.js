const mongoose=require('mongoose')

const fileSchema=new mongoose.Schema({
    files: {
        type: String,
        required: true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('file', fileSchema);