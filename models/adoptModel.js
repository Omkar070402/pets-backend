import mongoose from 'mongoose'

const adoptionSchema = new mongoose.Schema(
    {
      petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      reason: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
    { timestamps: true }
  );

const Adoption = mongoose.model('Adoption',adoptionSchema)

export default Adoption