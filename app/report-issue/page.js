import Header from "../components/Header";
import ReportForm from "../components/ReportForm";
import Form from "../components/TestForm";  

export default function ReportIssuePage() {
  return ( <>
    <Header />
    <div className="container mx-auto p-6">
      <ReportForm/>
    </div>
  </>
  );
}
