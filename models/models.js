var mongoose = require('mongoose');

//my model(s)
var guestSchema = new mongoose.Schema({
    Full_Name: String,
    Email: String,
    Phone_Number: String,
    Home_Address: String,
    Social_Media_Address:String
});

mongoose.model("guests", guestSchema);