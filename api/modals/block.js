import mongoose from 'mongoose';
const blockSchema = new mongoose.Schema({
    blockName: { type: String, required: true },
    sharing: { type: Number, required: true },  // 2-sharing, 3-sharing, etc.
    totalFloors: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
    yearRestrictions: { type: [Number] },
    departmentRestrictions: { type: [String] },
    sharedBlock: { type: Boolean, default: false }
  });
  const Block=mongoose.model("Block",blockSchema)
export default Block