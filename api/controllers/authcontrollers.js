import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Student from "../modals/student.js";
import Floor from "../modals/floor.js";
import Block from "../modals/block.js";
import { errorHandler } from "../utils/errorhandler.js";
dotenv.config();

module.exports.signin = async (req, res, next) => {
    const { rollnum, password } = req.body;
    if (!rollnum || !password || rollnum === '' || password === '') {
        return next(errorHandler(400, "All fields are required"));
    }

    const getAvailableBlocks = async (year, department) => {
        return await Block.find({
            $or: [
                { sharedBlock: true },  // Blocks available to all students
                { yearRestrictions: year, departmentRestrictions: department }
            ]
        }).lean(); // Use .lean() to get plain JavaScript objects
    };

    try {
        const validStudent = await Student.findOne({ rollNumber: rollnum });
        if (!validStudent) {
            return next(errorHandler(404, "User not found"));
        }

        const validPassword = bcryptjs.compareSync(password, validStudent.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }

        const availableBlocks = await getAvailableBlocks(validStudent.year, validStudent.department);
        // console.log(availableBlocks)
        for (let i = 0; i < availableBlocks.length; i++) {
            const block = availableBlocks[i];
            const floors = await Floor.find({ blockId: block._id });

            block.totalVacantRooms = floors.reduce((sum, floor) => sum + floor.availableRooms, 0);
            block.floors = floors.map(floor => ({
                floorNumber: floor.floorNumber,
                totalRooms: floor.totalRooms,
                availableRooms: floor.availableRooms
            }));

            // Update the original array with the modified plain object
            availableBlocks[i] = block;
        }

        // console.log(availableBlocks);
        const token = jwt.sign({ id: validStudent._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validStudent._doc;
        res.status(200).cookie('access_token', token, { httpOnly: true }).json({ rest, availableBlocks });
    }
    catch (err) {
        next(err);
    }
};
module.exports.signout=async(req,res,next)=>{
    try {
        res
          .clearCookie('access_token')
          .status(200)
          .json('User has been signed out');
      } catch (error) {
        next(error);
      }
}