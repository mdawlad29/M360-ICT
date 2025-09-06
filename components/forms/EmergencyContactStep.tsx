'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { relationships } from '@/data/mockData';
import { calculateAge } from '@/utils/formUtils';

interface EmergencyContactStepProps {
  form: UseFormReturn<FormData>;
}

export function EmergencyContactStep({ form }: EmergencyContactStepProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  
  const dateOfBirth = watch('dateOfBirth');
  const isUnder21 = dateOfBirth ? calculateAge(dateOfBirth) < 21 : false;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contact</CardTitle>
        <CardDescription>
          Please provide emergency contact information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="contactName">Contact Name *</Label>
          <Input
            id="contactName"
            {...register('contactName')}
            placeholder="Full name of emergency contact"
            className="mt-1"
          />
          {errors.contactName && (
            <p className="text-sm text-red-600 mt-1">{errors.contactName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="relationship">Relationship *</Label>
          <Select
            value={watch('relationship')}
            onValueChange={(value) => setValue('relationship', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              {relationships.map((rel) => (
                <SelectItem key={rel} value={rel}>
                  {rel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.relationship && (
            <p className="text-sm text-red-600 mt-1">{errors.relationship.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contactPhone">Phone Number *</Label>
          <Input
            id="contactPhone"
            {...register('contactPhone')}
            placeholder="+1-123-456-7890"
            className="mt-1"
          />
          {errors.contactPhone && (
            <p className="text-sm text-red-600 mt-1">{errors.contactPhone.message}</p>
          )}
        </div>

        {isUnder21 && (
          <>
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-orange-600">
                Guardian Contact Required (Under 21)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guardianName">Guardian Name *</Label>
                  <Input
                    id="guardianName"
                    {...register('guardianName')}
                    placeholder="Guardian's full name"
                    className="mt-1"
                  />
                  {errors.guardianName && (
                    <p className="text-sm text-red-600 mt-1">{errors.guardianName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                  <Input
                    id="guardianPhone"
                    {...register('guardianPhone')}
                    placeholder="+1-123-456-7890"
                    className="mt-1"
                  />
                  {errors.guardianPhone && (
                    <p className="text-sm text-red-600 mt-1">{errors.guardianPhone.message}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}