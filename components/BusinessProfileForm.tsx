"use client";

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { profileTemplates, ProfileTemplate } from '../lib/profileTemplates';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const urlSchema = z.string().url().or(z.literal(''));

const schema = z.object({
  template: z.string(),
  businessName: z.string().min(1, 'Business name is required'),
  website: urlSchema,
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  workingHours: z.object({
    monday: z.array(z.date()).optional(),
    tuesday: z.array(z.date()).optional(),
    wednesday: z.array(z.date()).optional(),
    thursday: z.array(z.date()).optional(),
    friday: z.array(z.date()).optional(),
    saturday: z.array(z.date()).optional(),
    sunday: z.array(z.date()).optional(),
  }),
  address: z.string().optional(),
  socialProfiles: z.string().refine(
    (value) => {
      if (!value) return true;
      const urls = value.split('\n');
      return urls.every((url) => urlSchema.safeParse(url).success);
    },
    { message: 'Invalid URL in social profiles' }
  ),
  bannerImage: z.instanceof(File).optional(),
  videoBackground: urlSchema,
  favicon: z.boolean(),
  logo: z.instanceof(File).optional(),
});

export function BusinessProfileForm({ onUpdate }) {
  const [selectedTemplate, setSelectedTemplate] = useState<ProfileTemplate>(profileTemplates[0]);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      template: profileTemplates[0].id,
      favicon: false,
      workingHours: {},
    },
  });

  const watchAllFields = watch();

  useEffect(() => {
    const template = profileTemplates.find(t => t.id === watchAllFields.template);
    onUpdate({ ...watchAllFields, ...template?.colors });
  }, [watchAllFields, onUpdate]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setPreview: (preview: string | null) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <form className="space-y-4">
      {/* ... (rest of the form remains the same) ... */}

      <div>
        <Label htmlFor="website">Website</Label>
        <Input id="website" {...register('website')} />
        {errors.website && <p className="text-red-500">{errors.website.message}</p>}
      </div>

      {/* ... (rest of the form remains the same) ... */}

      <div>
        <Label htmlFor="socialProfiles">Social Profiles</Label>
        <Textarea id="socialProfiles" {...register('socialProfiles')} placeholder="Enter social profile URLs, one per line" />
        {errors.socialProfiles && <p className="text-red-500">{errors.socialProfiles.message}</p>}
      </div>

      {/* ... (rest of the form remains the same) ... */}

      <div>
        <Label htmlFor="videoBackground">Video Background URL</Label>
        <Input id="videoBackground" {...register('videoBackground')} />
        {errors.videoBackground && <p className="text-red-500">{errors.videoBackground.message}</p>}
      </div>

      {/* ... (rest of the form remains the same) ... */}
    </form>
  );
}