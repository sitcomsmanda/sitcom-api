import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    immutable: true,
    default: () => this._id,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date.now(),
  },
});

tokenSchema.pre("save", function (next) {
  this.updatedAt = new Date.now();
  next();
});

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);
