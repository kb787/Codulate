var fs = require('fs') ;
var path = require('path') ;
const {v4 : build} = require('uuid') ;


const dirCodes = path.join(__dirname,"phpCodes") ; 

if(!fs.existsSync(dirCodes))
{
    fs.mkdirSync(dirCodes,{recursive:true}) ;
}

const generatePHPFileFunction = async(format,content) => 
{
    var jobId = uuid() ;
    var fileName = `${jobId}.{format}` ;
    var filePath = path.join(dirCodes,fileName) ;
    await fs.writeFileSync(filePath,content) ;
    return filePath ; 
} ;

module.exports = {
    generatePHPFileFunction
} ;