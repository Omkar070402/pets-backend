import Adoption from "../models/adoptModel.js";

const adoptRequest = async (req,res) =>{
    try{

        const { petId, name, email, phone, address, reason } = req.body;

        const newAdoption = new Adoption({
          petId,
          name,
          email,
          phone,
          address,
          reason,
        });
    
        await newAdoption.save();
        console.log(newAdoption);
        
        res.status(201).json({ success: true, message: "Adoption request submitted!" });
    

    }catch(error){

        res.status(500).json({ success: false, message: "Server Error", error });

    }
}

const getAdoptionRequests = async (req, res) => {
    try {
      const { email } = req.params; // Get email from URL params
       
  
      if (!email) {
        return res.status(400).json({ success: false, message: "User email is required!" });
      }
  
      const adoptions = await Adoption.find({ email }).populate("petId"); // Populate pet details
  
      res.status(200).json({
        success: true,
        adoptions,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };

  const updateAdoptionStatus = async (req, res) => {
    try {
        const { id } = req.params; // Get the adoption request ID from URL
        const { status } = req.body; // New status from request body

        const updatedAdoption = await Adoption.findByIdAndUpdate(
            id,
            { status }, // Update the status field
            { new: true } // Return the updated document
        );

        if (!updatedAdoption) {
            return res.status(404).json({ success: false, message: "Adoption request not found" });
        }

        res.status(200).json({ success: true, message: "Status updated successfully", adoption: updatedAdoption });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating status", error });
    }
};


export {adoptRequest,getAdoptionRequests,updateAdoptionStatus}