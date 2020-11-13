const express        = require('express'),
      app            = express(),
      bodyParser     =  require("body-parser"),
      methodOverride = require("method-override"),
      mongoose       = require('mongoose'),
      port           = 2000,
      patientSchema  =  require("./models/patientSchema"),
      doctorSchema   =  require("./models/doctorSchema")

//===========================================================Connect to database
mongoose.connect('mongodb+srv://atanao:dontinon@cluster0.enweg.mongodb.net/HealthAppDB?retryWrites=true&w=majority', 
{useNewUrlParser:true,useUnifiedTopology:true}, 
    function(err,database){
        if(err){
           throw err
        }
        console.log("Database Connection Successful")
   }
)

//============Middlewear
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(methodOverride("_method"));

//Homepage route
app.get("/", function(req,res){
    res.render("home")
})

//Add Doctor route
app.get("/add-doctor-details", function(req,res){
    res.render("addDoctor")
})

//Add Doctor
app.post("/add-doctor-details",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var newPatient = {name:name,email:email,password:password};
    doctorSchema.create(newPatient,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log(data);
            res.redirect("/view-doctor-info");
        }
    })
})

//View Doctor 
app.get("/view-doctor-info",(req, res)=>{
    doctorSchema.find({},(err,doctors)=>{
        if (err) {console.log(err);
        }else{
            res.render("viewDoctor",{doctors: doctors});
        }
    })
    
})

//Delete Doctor
app.delete("/delete-doctor-record:id",(req,res)=>{
    doctorSchema.findByIdAndRemove(req.params.id,function (err){
        if(err){
            console.log(err);
        }else {
            res.redirect("/view-doctor-info");
            }
    })
})

//Update Doctor
//Get EditForm
app.get("/update-doctor-record:id/edit",(req,res)=>{
    doctorSchema.findById(req.params.id,function (err, doctor){
        if(err){
            console.log(err);
        }else{
            res.render("editDoctor",{doctor: doctor});
        }
    })
})

//Edit Put request
app.put("/update-doctor-record:id/edit",(req, res)=>{
    doctorSchema.findByIdAndUpdate(req.params.id,req.body.doctor,function(err,updatedata){
        if(err){
            console.log(err);
        }else{
            console.log(updatedata)
            res.redirect("/view-doctor-info");
        }
    })
})

//=============================================PATIENT SECTION
//Add Patient route
app.get("/add-patient-details", function(req,res){
    doctorSchema.find({},(err,doctors)=>{
        if (err) {console.log(err);
        }else{
            res.render("addPatient",{doctors: doctors});
        }
    })
})

//Add Patient
app.post("/add-patient-details",(req,res)=>{
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var password = req.body.password;
    var doctor = req.body.doctor;
    var newPatient = {name:name,age:age,email:email,password:password,doctor:doctor};
    patientSchema.create(newPatient,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log(data);
            res.redirect("/view-patient-info");
        }
    })
})

//View Patient
app.get("/view-patient-info",(req, res)=>{
    patientSchema.find({},(err,patients)=>{
        if (err) {console.log(err);
        }else{
            res.render("viewPatient",{patients: patients});
        }
    })
    
})

//Delete Patient
app.delete("/delete-patient-record:id",(req,res)=>{
    patientSchema.findByIdAndRemove(req.params.id,function (err){
        if(err){
            console.log(err);
        }else {
            res.redirect("/view-patient-info");
            }
    })
})

//Update Patient
//Get EditForm
app.get("/update-patient-record:id/edit",(req,res)=>{
    patientSchema.findById(req.params.id,function (err, patient){
        if(err){
            console.log(err);
        }else{
            res.render("editPatient",{patient: patient});
        }
    })
})

//Edit Put request
app.put("/update-patient-record:id/edit",(req, res)=>{
    patientSchema.findByIdAndUpdate(req.params.id,req.body.patient,function(err,updatedata){
        if(err){
            console.log(err);
        }else{
            console.log(updatedata)
            res.redirect("/view-patient-info");
        }
    })
})


//Call the port the app is running on
app.listen(port,()=>{
    console.log(`App running on port:${port}`)
})