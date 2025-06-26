import Complaint from "../modals/complaint.js"
export const addComplaints=async(req,res,next)=>{
    try {
        const { name, rollNo, blockNo, floorNo, roomNo, contactNo, problemDescription, status } = req.body;
        
        // Create a new complaint with the received data
        const newComplaint = new Complaint({
            name,
            rollNo,
            blockNo,
            floorNo,
            roomNo,
            contactNo,
            problemDescription,
            status
        });

        // Save to the database
        await newComplaint.save();

        res.status(201).json({ message: 'Complaint added successfully', complaint: newComplaint });
    } catch (error) {
        console.error('Error adding complaint:', error);
        res.status(500).json({ error: 'An error occurred while submitting the complaint' });
    }

}
export const getComplaints=async (req,res,next)=>{
    try {
        const complaints = await Complaint.find({status:'pending'}); // Fetch all complaints from the database
        res.status(200).json(complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Failed to retrieve complaints' });
      }
}
export const getComplaintByrollNumber=async (req,res,next)=>{
    const {rollNumber}=req.params
    try {
        const complaints = await Complaint.find({rollNo:rollNumber,status:'pending'}); // Fetch all complaints from the database
        res.status(200).json(complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Failed to retrieve complaints' });
      }
}
export const deleteComplaint=async(req,res,next)=>{
    const { rollNumber } = req.params;

try {
  // Find the complaint by roll number
  const complaint = await Complaint.findOne({ rollNo: rollNumber });

  if (!complaint) {
    return res.status(404).json({ message: 'Complaint not found' });
  }

  // Delete the complaint by roll number
  await Complaint.deleteOne({ rollNo: rollNumber });

  res.json({ message: 'Complaint deleted successfully' });
} catch (error) {
  console.error('Error deleting complaint:', error);
  res.status(500).json({ message: 'Failed to delete complaint' });
}
    // res.json("s")
  
}