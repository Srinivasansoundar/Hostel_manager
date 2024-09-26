const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
  blockId: { type: mongoose.Schema.Types.ObjectId, ref: 'Block', required: true },
  floorNumber: { type: Number, required: true },
  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true }
});

const Floor = mongoose.model('Floor', floorSchema);
module.exports = Floor;