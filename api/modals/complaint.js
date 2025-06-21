const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    blockNo: String,
    floorNo: String,
    roomNo: String,
    contactNo: String,
    problemDescription: String,
    status: { type: String, enum: ['pending', 'onprogress', 'completed'], default: 'pending' }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
