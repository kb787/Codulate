const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const {c,cpp,java,node,python} = require('compile-run') ;
var taskModel = require('./taskModels');
let answer ;

const CompilerFunction = async(req,res) => 
{
     const {code, selectedValueLanguage, codeOutput} = req.body ;
     try {
          if( (selectedValueLanguage === "c" ) || (selectedValueLanguage ===  "C") )
          {    
               const dirCodes = path.join(__dirname,"cCodes") ; 
               if(!fs.existsSync(dirCodes))
                 {
                     fs.mkdirSync(dirCodes,{recursive:true}) ;
                 }
               const jobId = uuid();
               const fileName = `${jobId}.c`;
               const filePath = path.join(dirCodes, fileName);
               fs.writeFileSync(filePath,code); 
               var codeTask = await new taskModel(
                  {
                      code,selectedValueLanguage
                  }
               )
               codeTask.save() ;
               answer = await c.runFile(filePath, code) ;
               console.log("Choosen language is ",selectedValueLanguage) ;
               console.log("Entered code is",code) ;
               console.log("The output is ",answer.output) ;
               const responseObj = {
                success: true,
                codeOutput: answer.output,
              };
              return res.status(201).json(responseObj);
              
          }
          else if( (selectedValueLanguage === "c++" ) || (selectedValueLanguage ===  "C++") )
          {
               const dirCodes = path.join(__dirname,"cppCodes") ; 
               if(!fs.existsSync(dirCodes))
                 {
                     fs.mkdirSync(dirCodes,{recursive:true}) ;
                 }
               const jobId = uuid();
               const fileName = `${jobId}.CPP`;
               const filePath = path.join(dirCodes, fileName);
               fs.writeFileSync(filePath,code); 

               var codeTask = await new taskModel(
                   {
                       code,selectedValueLanguage
                   }
               )
               codeTask.save() ;
               answer = await cpp.runFile(filePath, code) ;
            {/*   
               answer = await new outputModel(
                   {
                        codeOutput
                   }
               )
                   
               answer.save() ;
            */}   
               console.log("Choosen language is ",selectedValueLanguage) ;
               console.log("Entered code is",code) ;
               console.log("The output is ",answer.output) ;
               const responseObj = {
                success: true,
                codeOutput: answer.output,
              };
              return res.status(201).json(responseObj);
          } 
          else if( (selectedValueLanguage === "java" ) || (selectedValueLanguage ===  "Java") )
          {
               const dirCodes = path.join(__dirname,"javaCodes") ; 
               if(!fs.existsSync(dirCodes))
                 {
                     fs.mkdirSync(dirCodes,{recursive:true}) ;
                 }
               const jobId = uuid();
               const fileName = `${jobId}.class`;
               const filePath = path.join(dirCodes, fileName);
               fs.writeFileSync(filePath,code);  
               var codeTask = await new taskModel(
                  {
                      code , selectedValueLanguage
                  }
               ) ;
               codeTask.save() ;
               var answer = await java.runFile(filePath, code) ;
               console.log("Choosen language is ",selectedValueLanguage) ;
               console.log("Entered code is",codeTask) ;
               console.log("The output is ",answer.output) ;
               const responseObj = {
                success: true,
                codeOutput: answer.output,
              };
              return res.status(201).json(responseObj);
          }
          else if( (selectedValueLanguage === "python" ) || (selectedValueLanguage ===  "Python") )
          {
               const dirCodes = path.join(__dirname,"pythonCodes") ; 
               if(!fs.existsSync(dirCodes))
                 {
                     fs.mkdirSync(dirCodes,{recursive:true}) ;
                 }

               const jobId = uuid();
               const fileName = `${jobId}.py`;
               const filePath = path.join(dirCodes, fileName);
               fs.writeFileSync(filePath,code); 
         
               var codeTask = await new taskModel(
                  {
                       code,selectedValueLanguage
                  }
               )
               codeTask.save() ; 
               answer = await python.runFile(filePath, code) ;
               console.log("Choosen language is ",selectedValueLanguage) ;
               console.log("Entered code is",code) ;
               console.log("The output is ",answer.output) ;
               const responseObj = {
                success: true,
                codeOutput: answer.output,
              };
              return res.status(201).json(responseObj);
          }
          else if( (selectedValueLanguage === "javascript" ) || (selectedValueLanguage ===  "Javacript") )
          {
               const dirCodes = path.join(__dirname,"javascriptCodes") ; 
               if(!fs.existsSync(dirCodes))
                 {
                     fs.mkdirSync(dirCodes,{recursive:true}) ;
                 }
               const jobId = uuid();
               const fileName = `${jobId}.js`;
               const filePath = path.join(dirCodes, fileName);
               fs.writeFileSync(filePath,code); 

               var codeTask = await new taskModel(
                   {
                       code,selectedValueLanguage
                   }
               )
               codeTask.save() ;
               answer = await node.runFile(filePath, code) ;
               console.log("Choosen language is ",selectedValueLanguage) ;
               console.log("Entered code is",code) ;
               console.log("The output is ",answer.output) ;
               const responseObj = {
                success: true,
                codeOutput : answer.output,
              };
              return res.status(201).json(responseObj);
          }
          else 
          {
               return res.status(404).json({message:"Undefined language",success:false}) ;
          }
          
     }

     catch(error)
     {
          console.log(error) ;
     }
} 

var express = require('express') ;
var compilerRouter = express.Router() ;

compilerRouter.post('/postCodeRequest', CompilerFunction) ;
module.exports = compilerRouter ;
