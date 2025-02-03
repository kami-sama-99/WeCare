import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          WeCare
        </Link>
        <div>
          <Link href="/login" className="mr-4 text-gray-600 hover:text-green-600">
            Login
          </Link>
          <Link href="/signup" className="text-gray-600 hover:text-green-600">
            Signup
          </Link>
        </div>
      </nav>
    </header>
  )
}

