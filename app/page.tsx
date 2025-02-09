import { DiseaseForm } from "@/components/disease-form"
import { AlertNotification } from "@/components/alert-notification"

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor's Dashboard</h1>
      <DiseaseForm />
      <AlertNotification />
    </div>
  )
}

