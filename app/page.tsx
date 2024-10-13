"use client";

import { useState } from 'react';
import { BusinessProfileForm } from '../components/BusinessProfileForm';
import { BusinessProfilePreview } from '../components/BusinessProfilePreview';
import { profileTemplates } from '../lib/profileTemplates';

export default function Home() {
  const [profileData, setProfileData] = useState({
    template: profileTemplates[0].id,
    ...profileTemplates[0].colors,
  });

  const handleProfileUpdate = (data) => {
    setProfileData(data);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Business Profile Builder</h1>
        <BusinessProfileForm onUpdate={handleProfileUpdate} />
      </div>
      <div className="w-full md:w-1/2 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <BusinessProfilePreview data={profileData} />
      </div>
    </div>
  );
}