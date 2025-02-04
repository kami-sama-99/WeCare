import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  category: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  description: { type: String, required: true },
  image: { type: String }, // Store image URL if needed
  notify: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
