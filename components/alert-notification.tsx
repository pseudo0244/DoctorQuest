"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function AlertNotification() {
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    const checkDiseaseCount = () => {
      const storedCount = localStorage.getItem("diseaseCount")
      if (storedCount) {
        const diseaseCount = JSON.parse(storedCount)
        const newAlerts = Object.entries(diseaseCount)
          .filter(([_, count]) => (count as number) > 3)
          .map(([disease]) => disease)
        setAlerts(newAlerts)
      }
    }

    checkDiseaseCount()
    const interval = setInterval(checkDiseaseCount, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (alerts.length === 0) return null

  return (
    <div className="mt-4 space-y-2">
      {alerts.map((disease) => (
        <Alert variant="destructive" key={disease}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Alert</AlertTitle>
          <AlertDescription>The disease "{disease}" has been entered more than 3 times.</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

