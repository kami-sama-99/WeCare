export default function TopEvents() {
    return <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-green-600 text-white p-6 space-y-3">
        <h2 className="text-2xl font-bold">Top Reports</h2>
      </div>

      {/* Footer Section */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <ul>
                <li>
                    <p className="text-xl font-bold">Report-1</p>
                </li>
                <li>
                    <p className="text-xl font-bold">Report-2</p>
                </li>
                <li>
                    <p className="text-xl font-bold">Report-3</p>
                </li>
            </ul>
        </div>
      </div>
    </div>
}