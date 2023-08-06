var mongoose = require('mongoose') ;

var outputSchema = mongoose.Schema(
    {
        codeOutput : 
        {
            type:String ,
        }
    }
) ;

if(mongoose.models['outputs'])
{
    return mongoose.model('outputs') ;
}

var outputModel = mongoose.model('outputs',outputSchema) ;

module.exports = outputModel ;

