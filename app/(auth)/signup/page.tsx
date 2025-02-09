"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"  // Ensure this is imported

const SignUpPage = () => {
  const [name, setName] = useState<string>("")
  const [registrationId, setRegistrationId] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [district, setDistrict] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form data
    const formData = {
      name,
      registrationId,
      email,
      password,
      district,
    }

    try {
      // Call your backend API for sign-up (or login if already registered)
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Save the JWT token in localStorage
        localStorage.setItem("token", data.token)

        // Redirect user to the home page or dashboard
        router.push("/")
      } else {
        setErrorMessage(data.message || "Something went wrong, please try again.")
      }
    } catch (error) {
      console.error("Error during sign-up:", error)
      setErrorMessage("An error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="registrationId">Registration ID</Label>
        <Input id="registrationId" value={registrationId} onChange={(e) => setRegistrationId(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="district">District</Label>
        <Input
          id="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          placeholder="Enter your district"
        />
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}

export default SignUpPage
