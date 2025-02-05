import { useUser } from "@clerk/clerk-react"; // Import the useUser hook from Clerk

export default function Profile() {
  const { user } = useUser(); // Fetch the current user data

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-green-600 text-white p-6 space-y-3">
        <h2 className="text-2xl font-bold">Hi {user?.firstName || user?.username || "User"}</h2> {/* Display user name or fallback to "User" */}
      </div>

      {/* Footer Section */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <ul>
                <li>
                    <p className="text-xl font-bold">MyReports</p>
                </li>
                <li>
                    <p className="text-xl font-bold">MyAction</p>
                </li>
                <li>
                    <p className="text-xl font-bold"></p>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
}
