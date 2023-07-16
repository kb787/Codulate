var express = require('express') ;
var http = require('http') ;
var app = express() ;
var cors = require('cors') ;
var server = http.createServer(app) ;
var Connect = require('./configure') ;
var morgan = require('morgan') ; 
var userRouter = require('./controller') ;
app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;
app.use(morgan('dev')) ;
app.use(cors());
Connect() ;

var corsOptions = {
    origin:"http://localhost:3000" ,
}
app.use(cors(corsOptions)) ;
app.use("/v1/api", userRouter) ;
app.get("/" , (req,res) => 
{
    res.send(" Your server side application had started ") 
}
)
server.listen(3500, () => 
    {
        console.log(" Application started succesfully ") ;
    }
)
