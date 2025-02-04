import connectDB from "@/app/mongodb"; // Ensure the correct import
import Report from "@/app/models/util/Report";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB(); 
    console.log("✅ Connected to MongoDB");

    // Ensure request body is parsed correctly
    const body = await req.json(); 
    console.log("📩 Received Data:", body);

    // Extract required fields
    const { category, location, description, image, notify } = body;

    if (!category || !location || !description) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newReport = new Report({
      category,
      location,
      description,
      image,
      notify,
    });

    await newReport.save();

    return NextResponse.json({ success: true, message: "Report submitted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error submitting report:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
