import Waiting from "../modals/waiting"
module.exports.waiting=async(req,res,next)=>{
   const {rollnumber,contact,block}=req.body;
   const waiting = new Waiting({
    rollNumber:rollnumber,
    Contact:contact,
    BlockName:block
  });
  const data = await waiting.save();
//    console.log(data)
   res.json(data)
}
module.exports.waitingStduent=async(req,res,next)=>{
    try {
        const { blockName } = req.params;
        
        // Find documents in Waiting model with the specified blockname
        const waitingList = await Waiting.find({ BlockName: blockName });
        
        // Send the filtered documents as a JSON response
        res.json(waitingList);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve waiting list' });
      }
}