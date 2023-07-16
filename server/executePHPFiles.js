const {exec} = require("child_process") ;
var fs = require('fs') ;
var path = require('path') ;

var outputPath = path.join(__dirname,"phpOutputs") ;

if(!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath, {recursive:true}) ;
}

const executePHPFunction = (filePath) => 
{
    const fileId = path.basename(filePath).split(".")["0"] ;
    const outPath  = path.join(outputPath, `${fileId}.out`) ;

    return new Promise((resolve,reject) => 
    {
        exec(
            `php ${filePath} -o ${outPath} cd ${outputPath} && ./${fileId}.out` , 
             (error,stdout,stderr) => {
                 if(error)
                 {
                    reject(error) ;
                 }
                 else if(stderr)
                 {
                     reject(stderr) ;
                 }
                 else if(stdout)
                 {
                    resolve(stdout) ;
                 }
             }

        )
    }
    )
}

module.exports = {executePHPFunction} 