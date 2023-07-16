const {exec} = require('child_process') ;
const fs = require('fs') ;
const path = require('path') ;

const outputPath = path.join(__dirname,"cppOutputs") ;

if(!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath, {recursive:true}) ;
}

const executeCppFunction = (filepath) => 
{
    var fileId = path.basename(filepath).split(".")["0"] ;
    var outPath = path.join(outputPath,`${fileId}.out`) ;

    return new Promise((resolve,reject) =>
    {
        exec(
            `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${fileId}.out` ,
             (error,stdout,stderr) => {
                   if(error)
                   {
                      reject(error) ;
                   }
                   else if(stderr)
                   {
                      reject(stderr) ;
                   }
                   else 
                   {
                       resolve(stdout) ;
                   }
             }

        )
    }
    )
    
} 

module.exports = {executeCppFunction} ;