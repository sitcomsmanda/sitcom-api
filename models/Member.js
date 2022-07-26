import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  jabatan: {
    type: String,
    required: true,
  },
  angkatan: {
    type: String,
    required: true,
  },
  asalSmp: String,
  hobi: String,
  deskripsi: String,
  createdAt: {
    type: Date,
    ummutable: true,
    default: () => new Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date.now(),
  },
});

memberSchema.index({ "$**": "text" });

memberSchema.pre("save", function (next) {
  this.updatedAt = new Date.now();
  next();
});

export default mongoose.models.Member || mongoose.model("Member", memberSchema);
