import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "WeCare - A Better Tomorrow Starts Today",
  description: "WeCare is a community-driven platform dedicated to making cities cleaner and more sustainable.",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  )
}

