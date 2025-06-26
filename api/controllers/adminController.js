import bcryptjs from "bcryptjs";
import Admin from "../modals/admin.js";
import Block from "../modals/block.js";
import Student from "../modals/student.js";
import { errorHandler } from "../utils/errorhandler.js";
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();
module.exports.signin = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password || username === '' || password === '') {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validAdmin = await Admin.findOne({ username: username });
    if (!validAdmin) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const blocks = await Block.find({}, 'blockName'); // 'blockName' selects only blockName field
    res.status(200).json(blocks);
  }
  catch (err) {
    next(err);
  }
}
module.exports.allotedStudent = async (req, res, next) => {
  try {
    const { blockName } = req.params;

    // Find all students in the specified block
    const students = await Student.find({ block: blockName }).select('floor roomNumber roommates name rollNumber');

    // Create a map to group students by floor and room
    const roomAllocationMap = {};

    students.forEach(student => {
      const key = `${student.floor}-${student.roomNumber}`; // Create a unique key for each floor-room combination

      // If the room entry doesn't exist in the map, initialize it
      if (!roomAllocationMap[key]) {
        roomAllocationMap[key] = {
          floor: student.floor,
          roomNumber: student.roomNumber,
          roommates: [] // To store details of all roommates in this room
        };
      }

      // Add the current student to the roommates list of this room
      roomAllocationMap[key].roommates.push({
        name: student.name,
        rollNumber: student.rollNumber
      });
    });

    // Convert the map object to an array of room allocations
    const response = Object.values(roomAllocationMap);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'An error occurred while fetching students' });
  }
}
module.exports.viewBlock = async (req, res, next) => {
  try {
    const blockName = req.params.blockName;
    const block = await Block.findOne({blockName});
    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }
    console.log(block)
    res.json(block);
  } catch (error) {
    console.error('Error fetching block:', error);
    res.status(500).json({ message: 'Error fetching block' });
  }
}
module.exports.editBlock=async(req,res,next)=>{
  try {
    const blockName = req.params.blockName;
    const block = await Block.findOne({blockName});
    // console.log("hel")
    const blockid=block._id;
    let { sharing, yearRestrictions, departmentRestrictions, sharedBlock } = req.body;
    // console.log(departmentRestrictions)
    yearRestrictions = yearRestrictions.split(',').map(dept => dept.trim());
    departmentRestrictions = departmentRestrictions.split(',').map(dept => dept.trim());
    const updatedBlock = await Block.findByIdAndUpdate(
      blockid,
      { sharing, yearRestrictions, departmentRestrictions, sharedBlock },
      { new: true }
    );
    
    if (!updatedBlock) {
      return res.status(404).json({ message: 'Block not found' });
    }

    res.json(updatedBlock);
  } catch (error) {
    console.error('Error updating block:', error);
    res.status(500).json({ message: 'Error updating block' });
  }
}