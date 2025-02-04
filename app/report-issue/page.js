import ReportForm from "../components/ReportForm";
import Form from "../components/TestForm";  

export default function ReportIssuePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Report an Issue</h1>
      <ReportForm/>
    </div>
  );
}
