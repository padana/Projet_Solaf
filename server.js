var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var exphbs  = require('express-handlebars');
var expressValidator = require("express-validator");

var body = expressValidator.body;
var validationResult = expressValidator.validationResult;

var multer = require('multer');
var upload = multer({ dest: 'public/uploads'}); //mouhamad padane
var fs = require('fs');
var inscriptionModel = require('./models/user');




var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
  });
var upload = multer({storage: storage})

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use(express.json());

/*app.post('/', function(req, res){
  res.json(req.body);
});
*/

mongoose.connect('mongodb://localhost/Solaf', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function(err){
    if(err !== null){
        console.log('connection erreur', err);
    } else{
        console.log('DB connected');
    }
});

inscriptionModel.find({}, function(err, documents){
    // console.log('err', err);
     //console.log('documents', documents)
 
     if(err !== null){
         console.log('err', err)
     } else{
         console.log('Student fetched successfully');
         console.log('documents', documents)
     }
});

app.use("/", express.static("public"));


//handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function(req, res){
   res.render('home');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/public/style.css');
});



app.post('/contact',upload.single('filePdf'), function (req, res) {

   var name = req.body.name
   var email= req.body.email
   var phone = req.body.phone
   var filePdf = req.file.path

   var student = new inscriptionModel({
       name: name,
       email: email,
       phone: phone,
       filePdf: filePdf
   })
   
   res.render('contact', {
        title: name  

    })

    student.save(function(err, documents){
        console.log('err', err);
        console.log('document', documents);
   
        if(err !== null){
           console.log('cannot save student err', err);
       } else{
           console.log('student save successufuly');
           console.log('document', documents);
   
       }
    });


    console.log("POST/ ", name)
});
 

var server = app.listen(3030, function () {
    console.log('Node server is running..');
});