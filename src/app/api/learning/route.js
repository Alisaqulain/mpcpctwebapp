import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "learningData.json");

// GET - Retrieve learning data
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf8");
    const learningData = JSON.parse(data);
    return NextResponse.json(learningData);
  } catch (error) {
    console.error("Error reading learning data:", error);
    return NextResponse.json(
      { error: "Failed to load learning data" },
      { status: 500 }
    );
  }
}

// POST - Update learning data
export async function POST(request) {
  try {
    const updatedData = await request.json();
    
    // Validate the data structure
    if (!updatedData.sections || !Array.isArray(updatedData.sections)) {
      return NextResponse.json(
        { error: "Invalid data structure" },
        { status: 400 }
      );
    }

    // Save the updated data back to the file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({ 
      message: "Learning data updated successfully",
      data: updatedData 
    });
  } catch (error) {
    console.error("Error updating learning data:", error);
    return NextResponse.json(
      { error: "Failed to update learning data" },
      { status: 500 }
    );
  }
}

// PUT - Update a specific lesson
export async function PUT(request) {
  try {
    const { sectionId, lessonId, lessonData } = await request.json();
    
    // Read current data
    const data = await fs.readFile(DATA_FILE_PATH, "utf8");
    const learningData = JSON.parse(data);
    
    // Find and update the specific lesson
    const section = learningData.sections.find(s => s.id === sectionId);
    if (!section) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }
    
    const lessonIndex = section.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }
    
    // Update the lesson
    section.lessons[lessonIndex] = { ...section.lessons[lessonIndex], ...lessonData };
    
    // Save back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(learningData, null, 2));
    
    return NextResponse.json({ 
      message: "Lesson updated successfully",
      lesson: section.lessons[lessonIndex]
    });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a lesson
export async function DELETE(request) {
  try {
    const { sectionId, lessonId } = await request.json();
    
    // Read current data
    const data = await fs.readFile(DATA_FILE_PATH, "utf8");
    const learningData = JSON.parse(data);
    
    // Find the section
    const section = learningData.sections.find(s => s.id === sectionId);
    if (!section) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }
    
    // Remove the lesson
    const lessonIndex = section.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }
    
    section.lessons.splice(lessonIndex, 1);
    
    // Save back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(learningData, null, 2));
    
    return NextResponse.json({ 
      message: "Lesson deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json(
      { error: "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
