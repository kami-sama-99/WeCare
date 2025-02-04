"use client"
import { useRef } from "react";
import { db, collection, addDoc } from "@/firebase";

export default function TestForm() {
    const formRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = {
            id: formData.get("Id") || "",  // Ensure valid string
            createdAt: new Date()  // Firestore requires `Timestamp` or `Date`
        };        
        console.log("Submitted data", data);
        try {
            await addDoc(collection(db, "Reports"), data);
      
            // Reset form after successful submission
            formRef.current.reset();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="Id"/>
        <button type="submit">Submit</button>
    </form>
}