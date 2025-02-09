"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DiseaseEntry {
  diseaseName: string;
  patientName: string;
  district: string;
  village: string;
}

export function DiseaseForm() {
  const [diseaseName, setDiseaseName] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const [diseaseEntries, setDiseaseEntries] = useState<DiseaseEntry[]>([]);
  const [nearbyVillages, setNearbyVillages] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const router = useRouter(); // Initialize useRouter for navigation

  const diseaseOptions = [
    "Typhoid",
    "Dengue",
    "Cholera",
    "Malaria",
    "Tuberculosis",
    "Leptospirosis",
    "Chikungunya",
    "Hepatitis",
    "Other"
  ];

  const districtOptions = [
    { value: 'Abhayapuri', label: 'Abhayapuri' },
    { value: 'Aboi', label: 'Aboi' },
    { value: 'Abu Road', label: 'Abu Road' },
    { value: 'Achabal', label: 'Achabal' },
    { value: 'Achhnera', label: 'Achhnera' },
  ];

  const nearbyVillagesData: { [key: string]: string[] } = {
    "Aamby Valley": ["Khopoli", "Lonavala", "Malavli"],
    "Abhayapuri": ["Bijni", "Goalpara"],
    "Aboi": ["Angphang", "Mon", "Wakching"],
    "Abu Road": ["Ambaji", "Mount Abu"],
    "Achabal": ["Bijbehara", "Devsar", "Dooru Verinag", "Frisal"],
  };

  useEffect(() => {
    const storedEntries = localStorage.getItem("diseaseEntries");
    if (storedEntries) {
      setDiseaseEntries(JSON.parse(storedEntries));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const count = diseaseEntries.filter(entry => entry.diseaseName === diseaseName).length;

    if (count >= 4) {
      alert(`You have already entered ${diseaseName} 5 times!`);
      return;
    }

    const newEntry: DiseaseEntry = { diseaseName, patientName, district, village };
    const updatedEntries = [...diseaseEntries, newEntry];
    setDiseaseEntries(updatedEntries);
    localStorage.setItem("diseaseEntries", JSON.stringify(updatedEntries));
    setDiseaseName("");
    setPatientName("");
    setDistrict("");
    setVillage("");

    const villages = nearbyVillagesData[district] || [];
    setNearbyVillages(villages);

    const sameVillageEntries = updatedEntries.filter(
      (entry) => entry.diseaseName === diseaseName && entry.village === village
    );

    if (sameVillageEntries.length > 3) {
      const notification = {
        title: "Disease Spread Notification",
        message: `The disease ${diseaseName} has spread in ${district}. There are now more than 3 reported cases.`,
        diseaseName,
        village,
        district,
      };

      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    }
  };

  const handleDelete = (index: number) => {
    const updatedEntries = diseaseEntries.filter((_, i) => i !== index);
    setDiseaseEntries(updatedEntries);
    localStorage.setItem("diseaseEntries", JSON.stringify(updatedEntries));
  };

  const handleClearNearbyVillages = () => {
    setNearbyVillages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <div>
        <Label htmlFor="diseaseName" className="text-xl font-semibold text-gray-700">Disease Name</Label>
        <select
          id="diseaseName"
          value={diseaseName}
          onChange={(e) => setDiseaseName(e.target.value)}
          required
          className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Disease</option>
          {diseaseOptions.map((disease, index) => (
            <option key={index} value={disease}>
              {disease}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <Label htmlFor="patientName" className="text-xl font-semibold text-gray-700">Patient Name</Label>
        <Input
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
          className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      
      <div>
        <Label htmlFor="district" className="text-xl font-semibold text-gray-700">District</Label>
        <select
          id="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select District</option>
          {districtOptions.map((districtOption, index) => (
            <option key={index} value={districtOption.value}>
              {districtOption.label}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
        Submit
      </Button>

      {/* Navigate to Notifications Page */}
      <Button
        type="button"
        onClick={() => router.push("/notifications")}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
      >
        View Notification
      </Button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Disease Entries</h2>
        <ul className="list-disc pl-5 mt-3">
          {diseaseEntries.map((entry, index) => (
            <li key={index} className="flex justify-between items-center py-2">
              <span className="text-gray-800">{entry.diseaseName} - {entry.patientName} - {entry.district} - {entry.village}</span>
              <Button
                variant="destructive"
                onClick={() => handleDelete(index)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
