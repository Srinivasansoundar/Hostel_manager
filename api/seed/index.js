// Function to hash passwords
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import Student from "../modals/student.js";
import students from "./studentseed.js";
import blocks from "./blockseed.js";
import Block from "../modals/block.js";
import Floor from "../modals/floor.js";
import Admin from "../modals/admin.js";
dotenv.config({path:'../.env'})
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
const hashPassword = async (rollNumber) => {
    const saltRounds = 10; 
    return await bcrypt.hash(rollNumber, saltRounds);
  };
  const seedAdmin = async () => {
    try {
      await Admin.deleteMany({});
      // for (let student of students) {
      //   student.password = await hashPassword(student.rollNumber); 
      // }
      const admin=new Admin({
        username:"Srini", 
        password:await hashPassword("srini")
      })
      await admin.save()
      console.log("Admin data with hashed passwords seeded successfully");
      mongoose.disconnect();
    } catch (error) {
      console.error("Error seeding student data:", error);
      mongoose.disconnect();
    }
  };
  // seedAdmin()
const seedStudents = async () => {
    try {
      await Student.deleteMany({});
      for (let student of students) {
        student.password = await hashPassword(student.rollNumber); 
      }
      await Student.insertMany(students);
      console.log("Student data with hashed passwords seeded successfully");
      mongoose.disconnect();
    } catch (error) {
      console.error("Error seeding student data:", error);
      mongoose.disconnect();
    }
  };
//  seedStudents();
const seedBlocks = async () => {
    try {
      await Block.deleteMany({});
      await Block.insertMany(blocks);
  
      console.log("Block data seeded successfully");
      mongoose.disconnect();
    } catch (error) {
      console.error("Error seeding block data:", error);
      mongoose.disconnect();
    }
  };
// seedBlocks();
const seedFloors = async () => {
    try {
      await Floor.deleteMany({});
      const blocks = await Block.find({});
      for (let block of blocks) {
        for (let i = 1; i <= block.totalFloors; i++) {
          const floor = new Floor({
            blockId: block._id,  
            floorNumber: i,      
            totalRooms: 10,      
            availableRooms: 10   
          });
  
          await floor.save();
        }
      }
  
      console.log("Floor data seeded successfully");
      mongoose.disconnect();
    } catch (error) {
      console.error("Error seeding floor data:", error);
      mongoose.disconnect();
    }
  };
  seedFloors();