import mongoose from "mongoose";
import { NextResponse } from "next/server";

const ReportSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    severity: Number,
    createdAt: Date,
  },
  { collection: "reports" } 
);

const Report =
  mongoose.models.Report || mongoose.model("Report", ReportSchema);

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Mongo Connected");
    }

    const reports = await Report.find().sort({ severity: -1 });

    return NextResponse.json({ success: true, reports });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "DB error" });
  }
}
