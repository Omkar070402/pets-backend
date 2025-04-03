import Pet from "../models/petModel.js";
import { cloudinary } from "../configs/cloudinary.js";

const getPet = async (req, res) => {
    try {
        const getAllPet = await Pet.find({});

        res.json({
            success: true,
            error: false,
            pets: getAllPet
        });

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            error: true,
            message: error.message
        });
    }
};

const addPet = async (req, res) => {
    try {
        const { name, breed, age, description, gender, location, adoptionStatus } = req.body;

        // Check if images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Images are required!" });
        }

        // Upload images to Cloudinary
        let imageUrls = [];
        for (let file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "pets"  // Changed folder name from "products" to "pets"
            });
            imageUrls.push(result.secure_url);
        }

        // Create new pet
        const newPet = new Pet({
            name,
            description,
            breed,
            location,
            age,
            gender,  // Added gender field
            adoptionStatus,
            images: imageUrls, // Store uploaded image URLs
        });

        const savedPet = await newPet.save();
        console.log(savedPet);

        res.status(201).json({
            success: true,
            message: "Pet added successfully!",
            pet: savedPet,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        });
    }
};


const deletePet = async (req,res) =>{

  try{
     
    const {id} = req.params

    const deleteNow = await Pet.findByIdAndDelete(id)

    res.json({
        success : true,error : false , message : 'Pet deleted successfully'
    })


  }catch(error){

    console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        });



  }


}

const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.files && req.files.length > 0) {
            const imageUrls = [];
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "pets"
                });
                imageUrls.push(result.secure_url);
            }
            updateData.images = imageUrls;
        }

        const updatedPet = await Pet.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        res.json({ success: true, message: "Pet updated successfully", pet: updatedPet });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }
        res.json({ success: true, pet });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};






export { getPet, addPet , deletePet , updatePet,getPetById};
