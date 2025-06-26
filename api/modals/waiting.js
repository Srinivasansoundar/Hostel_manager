import mongoose from 'mongoose';
const waitingSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true },
    Contact: { type: Number, required: true },  // 2-sharing, 3-sharing, etc.
    BlockName: { type: String, required: true },
    
  });
  const Waiting=mongoose.model("Waiting",waitingSchema)
export default Waiting