"use client";

import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { profileTemplates } from '../lib/profileTemplates';
import { format } from 'date-fns';

export function BusinessProfilePreview({ data }) {
  const {
    template,
    businessName,
    website,
    phone,
    email,
    workingHours,
    address,
    socialProfiles,
    bannerImage,
    videoBackground,
    favicon,
    logo,
  } = data;

  const selectedTemplate = profileTemplates.find(t => t.id === template) || profileTemplates[0];
  const { background, text, accent } = selectedTemplate.colors;

  const getLayoutClass = () => {
    switch (selectedTemplate.layout) {
      case 'modern':
        return 'max-w-4xl mx-auto';
      case 'minimal':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-3xl mx-auto';
    }
  };

  const formatWorkingHours = (hours) => {
    if (!hours || Object.keys(hours).length === 0) return 'Not specified';
    return Object.entries(hours)
      .filter(([, value]) => value && Array.isArray(value) && value.length === 2)
      .map(([day, value]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${format(new Date(value[0]), 'HH:mm')} - ${format(new Date(value[1]), 'HH:mm')}`)
      .join(', ');
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div style={{ backgroundColor: background, color: text }} className={`p-8 rounded-lg shadow-lg ${getLayoutClass()}`}>
      {bannerImage && (
        <div className="mb-8">
          <img src={bannerImage} alt="Banner" className="w-full h-64 object-cover rounded-lg" />
        </div>
      )}

      {videoBackground && (
        <div className="mb-8">
          <video src={videoBackground} autoPlay loop muted className="w-full h-64 object-cover rounded-lg" />
        </div>
      )}

      <div className="flex items-center mb-8">
        {logo && <img src={logo} alt="Logo" className="w-20 h-20 object-contain mr-6" />}
        <h1 className="text-4xl font-bold" style={{ color: accent }}>{businessName}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {website && <p className="mb-4">Website: <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>{website}</a></p>}
          {phone && <p className="mb-4">Phone: {phone}</p>}
          {email && <p className="mb-4">Email: <a href={`mailto:${email}`} style={{ color: accent }}>{email}</a></p>}
        </div>
        <div>
          <p className="mb-4">Working Hours: {formatWorkingHours(workingHours)}</p>
          {address && <p className="mb-4">Address: {address}</p>}
        </div>
      </div>

      {socialProfiles && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: accent }}>Social Profiles</h2>
          <div className="flex flex-wrap gap-4">
            {socialProfiles.split('\n').filter(isValidUrl).map((profile, index) => {
              const url = new URL(profile);
              return (
                <a key={index} href={profile} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full" style={{ backgroundColor: accent, color: background }}>{url.hostname.split('.')[0]}</a>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: accent }}>QR Code</h2>
          <QRCodeSVG value={website || ''} size={128} bgColor={background} fgColor={accent} />
        </div>
        {favicon && (
          <div>
            <p className="text-sm font-semibold" style={{ color: accent }}>Favicon enabled</p>
          </div>
        )}
      </div>
    </div>
  );
}