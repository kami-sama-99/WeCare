import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">WeCare</h3>
            <p>Creating a better tomorrow, today.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <Link href="/" className="hover:text-green-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="hover:text-green-400">
                  Our Initiatives
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <ul>
              <li>
                <Link href="/volunteer" className="hover:text-green-400">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-green-400">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-green-400">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-green-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} WeCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

