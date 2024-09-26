const mongoose=require("mongoose")
const studentSchema = new mongoose.Schema({
    name: String,
    year: Number,
    rollNumber: String,
    department: String,
    roomNumber: String,
    block: String,
    floor: String,
    roommates: [String],
    password: String // hashed password
  });
const Student=mongoose.model("Student",studentSchema);
module.exports= Student;