var generateCFile = require('./generateCFiles') ;
var generateCppFile = require('./generateCppFiles') ;
var generateJavaFile = require('./executeJavaFiles') ;
var generateJavascriptFile = require('./executeJavascriptFiles') ;
var generateKotlinFile = require('./generateKotlinFiles') ;
var generateLuaFile = require('./generateLuaFiles') ;
var generatePerlFile = require('./generatePerlFiles') ;
var generatePHPFile = require('./generatePHPFiles') ;
var generatePythonFile = require('./generatePythonFiles') ;
var generateScalaFile = require('./generateScalaFiles') ;


var executeCFile = require('./executeCFiles') ;
var executeCppFile = require('./executeCppFiles') ;
var executeJavaFile = require('./executeJavaFiles') ;
var executeJavascriptFile  = require('./executeJavascriptFiles') ;
var executeKotlinFile = require('./executeKotlin') ;
var executeLuaFile = require('./executeLuaFiles') ;
var executePerlFile = require('./executePerlFiles') ;
var executePHPFile = require('./executePHPFiles') ;
var executePythonFile = require('./executePythonFiles') ;
var executeScalaFile = require('./executeScalaFiles') ;

var taskModel = require('./taskModels') ;

let output ;
let filePath ;
let task ;
const handleRunFunction = async(req,res) => 
{
    const {code , selectedValueLanguage , selectedFileOption} = req.body ;
      var newTask = new taskModel({code , selectedValueLanguage ,   selectedFileOption});
      var savedTask = await newTask.save();
      var taskId = savedTask._id ;  
      var currentTask = taskModel.findById(taskId) ;
    try 
    {   
       if(currentTask.selectedValueLanguage === "C++")
       {
            filePath = await generateCppFile("C++", code);
            output = await executeCppFile(filePath);
            console.log(output) ;
            return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "C") 
       {
           filePath = await generateCFile("C", code);
           output = await executeCFile(filePath);
           console.log(output) ;
           return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "Python") 
       {
          filePath = await generatePythonFile("Python", code);
          output = await executePythonFile(filePath); 
          console.log(output) ;
          return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "Java")
       {
          filePath = await generateJavaFile("Java", code);
          output = await executeJavaFile(filePath);
          console.log(output) ;
          return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "Javascript")
       {
          filePath = await generateJavascriptFile("Python", code);
          output = await executeJavascriptFile(filePath);
          console.log(output) ;
          return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "Kotlin")
       {  
           filePath = await generateKotlinFile("Kotlin", code);
           output = await executeKotlinFile(filePath);
           console.log(output) ;
           return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "Lua")
       {
           filePath = await generateLuaFile("Lua", code);
           output = await executeLuaFile(filePath);
           console.log(output) ;
           return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "Perl")
       {
           filePath = await generatePerlFile("Perl", code);
           output = await executePerlFile(filePath);
           console.log(output) ;
           return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "PHP")
       { 
           filePath = await generatePHPFile("PHP", code);
           output = await executePHPFile(filePath);
           console.log(output) ;
           return res.status(201).send({output, success:true}) ;
       }
       else if(currentTask.selectedValueLanguage === "Scala")
       {
          filePath = await generateScalaFile("Scala", code);
          output = await executeScalaFile(filePath);
          console.log(output) ;
          return res.status(201).send({output, success:true}) ;
       }
    }
    catch(error)
    {
        return res.status(500).send({message:" Unable to perform request ", success:false}) ;
    }  
    }   

var express = require('express') ;
var userRouter = express.Router() ;

userRouter.post('/handleRunRequest', handleRunFunction) ;

module.exports = userRouter ;