'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>;
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const { register, formState: { errors }, setValue } = form;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG and PNG files are allowed');
        return;
      }

      if (file.size > maxSize) {
        alert('File size must be under 2MB');
        return;
      }

      setValue('profilePicture', file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Tell us about yourself. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="Enter your full name"
            className="mt-1"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@company.com"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber')}
            placeholder="+1-123-456-7890"
            className="mt-1"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className="mt-1"
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
          <Input
            id="profilePicture"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">JPG or PNG, max 2MB</p>
        </div>
      </CardContent>
    </Card>
  );
}