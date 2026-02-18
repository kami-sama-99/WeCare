"use client";

import { MapPin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReportCard() {
  const [reports, setReports] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("/api/getReport");
      const data = await res.json();

      if (data.success) {
        setReports(data.reports);
      }
    };

    fetchReports();
  }, []);

  if (reports.length === 0) {
    return <p>Loading reports...</p>;
  }

  return (
    <div className="space-y-6 w-full">
      {reports.map((report) => (
        <div
          key={report._id}
          className="w-full overflow-hidden rounded-2xl bg-white shadow-lg"
        >
          {/* Header */}
          <div className="bg-red-600 text-white p-6 space-y-3">
            <h2 className="text-2xl font-bold">{report.title}</h2>

            <p className="text-sm leading-relaxed">{report.description}</p>

            <p className="text-sm font-medium text-black">
              Severity Level: {report.severity}
            </p>
          </div>

          {/* Footer */}
          <div className="p-4 flex justify-between items-center">
            <button
              onClick={() =>
                setExpandedId(expandedId === report._id ? null : report._id)
              }
              className="flex items-center gap-2"
            >
              <MapPin className="h-6 w-6" />
              {expandedId === report._id && (
                <span className="text-sm text-gray-600">
                  Location placeholder
                </span>
              )}
            </button>

            <ArrowUp className="h-6 w-6 hover:text-red-600 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
}
