'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { skillsByDepartment } from '@/data/mockData';

interface SkillsPreferencesStepProps {
  form: UseFormReturn<FormData>;
}

export function SkillsPreferencesStep({ form }: SkillsPreferencesStepProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  
  const selectedDepartment = watch('department');
  const selectedSkills = watch('primarySkills') || [];
  const remoteWorkPreference = watch('remoteWorkPreference') || 0;
  const skillExperience = watch('skillExperience') || {};

  const availableSkills = selectedDepartment ? skillsByDepartment[selectedDepartment as keyof typeof skillsByDepartment] || [] : [];

  const handleSkillToggle = (skill: string, checked: boolean) => {
    const currentSkills = selectedSkills;
    let newSkills;
    
    if (checked) {
      newSkills = [...currentSkills, skill];
      // Set default experience to 1 year
      setValue(`skillExperience.${skill}` as any, 1);
    } else {
      newSkills = currentSkills.filter(s => s !== skill);
      // Remove experience for unselected skill
      const newExperience = { ...skillExperience };
      delete newExperience[skill];
      setValue('skillExperience', newExperience);
    }
    
    setValue('primarySkills', newSkills);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Preferences</CardTitle>
        <CardDescription>
          Help us understand your expertise and work preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Primary Skills * (Select at least 3)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {availableSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={(checked) => handleSkillToggle(skill, checked as boolean)}
                />
                <Label htmlFor={skill} className="text-sm">{skill}</Label>
              </div>
            ))}
          </div>
          {errors.primarySkills && (
            <p className="text-sm text-red-600 mt-1">{errors.primarySkills.message}</p>
          )}
        </div>

        {selectedSkills.length > 0 && (
          <div>
            <Label>Experience Level (years)</Label>
            <div className="space-y-4 mt-2">
              {selectedSkills.map((skill) => (
                <div key={skill} className="flex items-center space-x-4">
                  <Label className="w-24 text-sm">{skill}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={skillExperience[skill] || 1}
                    onChange={(e) => setValue(`skillExperience.${skill}` as any, Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500">years</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>Preferred Working Hours *</Label>
          <div className="flex items-center space-x-4 mt-2">
            <div>
              <Label htmlFor="startTime" className="text-xs">Start</Label>
              <Input
                id="startTime"
                type="time"
                {...register('preferredWorkingHours.start')}
                className="w-32"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div>
              <Label htmlFor="endTime" className="text-xs">End</Label>
              <Input
                id="endTime"
                type="time"
                {...register('preferredWorkingHours.end')}
                className="w-32"
              />
            </div>
          </div>
          {errors.preferredWorkingHours && (
            <p className="text-sm text-red-600 mt-1">Working hours are required</p>
          )}
        </div>

        <div>
          <Label>Remote Work Preference: {remoteWorkPreference}%</Label>
          <Slider
            value={[remoteWorkPreference]}
            onValueChange={(value) => setValue('remoteWorkPreference', value[0])}
            max={100}
            step={10}
            className="mt-2"
          />
        </div>

        {remoteWorkPreference > 50 && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="managerApproved"
              checked={watch('managerApproved') || false}
              onCheckedChange={(checked) => setValue('managerApproved', checked as boolean)}
            />
            <Label htmlFor="managerApproved" className="text-sm">
              Manager has approved remote work arrangement *
            </Label>
          </div>
        )}

        <div>
          <Label htmlFor="extraNotes">Additional Notes (Optional)</Label>
          <Textarea
            id="extraNotes"
            {...register('extraNotes')}
            placeholder="Any additional information you'd like to share..."
            className="mt-1"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {watch('extraNotes')?.length || 0}/500 characters
          </p>
        </div>
      </CardContent>
    </Card>
  );
}