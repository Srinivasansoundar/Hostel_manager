import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    name: String,
    year: Number,
    rollNumber: String,
    department: String,
    roomNumber: String,
    block: String,
    floor: String,
    roommates: [String],
    password: String,// hashed password
    contact:Number,
  });
const Student=mongoose.model("Student",studentSchema);
export default Student