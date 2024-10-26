// controllers/studentController.js
const Student = require('../modals/student');
const Block = require("../modals/block")
const Floor = require("../modals/floor")
// Function to get student by roll number
const getStudentByRollNumber = async (req, res) => {
  try {
    // console.log(req.params)
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    const year = student.year;
    // const block = await Block.findOne({
    //   yearRestrictions: { $in: [year] }
    // });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to book a room and add roommates
const bookRoom = async (req, res) => {
  try {
    const { roommatesData, blockData, floorData } = req.body; // Array of booking objects
    const { blockName } = blockData;
    const { floorNumber } = floorData;
    let responses = {}
    let flag = false;
    let assignedRoomNumber = null;
    console.log(req.body)
    for (let booking of roommatesData) {
      const { rollNumber } = booking;

      // Find the student by their roll number
      const student = await Student.findOne({ rollNumber });
      if (!student) {
        return res.status(404).json({ message: `Student with roll number ${rollNumber} not found` });
      }

      //Check if the room is available on the selected floor
      const block = await Block.findOne({ blockName });
      if (!block) {
        return res.status(404).json({ message: `Block with name ${blockName} not found` });
      }
      const floor = await Floor.findOne({ blockId: block._id, floorNumber });
      // console.log('Found Floor:', floor);

      if (!floor || floor.availableRooms <= 0) {
        return res.status(400).json({ message: `No available rooms on floor ${floorNumber} of block ${blockName}` });
      }

      // Decrease the number of available rooms
      // student.roomNumber=floor.availableRooms
      if (!assignedRoomNumber) {
        assignedRoomNumber = floor.totalRooms - floor.availableRooms + 1; // Example logic to assign the next available room number
      }
      if (flag == false) {
        floor.availableRooms -= 1;
        flag = true
      }
      //   console.log(floor)
      await floor.save();
      student.block = blockName;
      student.floor = floorNumber;
      student.roomNumber = assignedRoomNumber;
      if (!student.roommates) {
        student.roommates = [];
      }
      floor.availableRooms
      //   Get roll numbers of other students sharing the room, excluding current student
      const otherRoommates = roommatesData
        .map((b) => b.rollNumber); // Get roll numbers of other students
      //console.log(otherRoommates)
      // Add otherRoommates to the current student's roommates array
      student.roommates = [...new Set([...student.roommates, ...otherRoommates])]; // Avoid duplicates
      await student.save();

      //   Update the roommates' records as well (add the current student to their roommates)
      for (let roommateRollNumber of otherRoommates) {
        const roommate = await Student.findOne({ rollNumber: roommateRollNumber });
        if (roommate) {
          if (!roommate.roommates) {
            roommate.roommates = [];
          }
          // Add current student's roll number to roommate's array (if not already present)
          roommate.roomNumber = assignedRoomNumber;
          roommate.roommates = [...new Set([...roommate.roommates, rollNumber])]; // Avoid duplicates
          await roommate.save();
        }
      }
      await student.save();
      responses = {
        blockName: block.blockName,
        floorNumber: floor.floorNumber,
        availableRooms: floor.availableRooms,
        assignedRoomNumber: assignedRoomNumber
        //vacantRooms:block.totalRooms
      }
    }


    res.status(200).json(responses);
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ message: 'An error occurred while booking the rooms' });
  }
  // res.json({message:"successfull"})
};

module.exports = {
  getStudentByRollNumber,
  bookRoom,
};
