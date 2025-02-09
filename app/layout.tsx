"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type React from "react" // Added import for React
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
      router.push("/login")
    }
  }, [router])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

