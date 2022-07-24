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
  hobi: [String],
  deskripsi: String,
  createdAt: {
    type: Date,
    ummutable: true,
    default: () => new Date.now(),
  },
  updateAt: {
    type: Date,
    default: () => new Date.now(),
  },
});

memberSchema.pre("save", function (next) {
  this.updateAt = new Date.now();
  next();
});

export default mongoose.model(`Member`, memberSchema);
