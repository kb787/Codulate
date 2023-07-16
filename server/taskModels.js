var mongoose = require('mongoose') ;

var taskSchema = mongoose.Schema(
    {  
        code :
        {
            type:String 
        } ,
        selectedValueLanguage :
        {
            type:String 
        } , 
        selectedFileOption :
        {
            type:String 
        } ,

    }
)

if(mongoose.models['users'])
{
    return mongoose.model('users') ;
}
const taskModel = mongoose.model('users',taskSchema) ;
module.exports = taskModel ;
