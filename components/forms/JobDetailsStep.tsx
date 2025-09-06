'use client';

import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockManagers, departments } from '@/data/mockData';
import { calculateAge, isWeekend } from '@/utils/formUtils';

interface JobDetailsStepProps {
  form: UseFormReturn<FormData>;
}

export function JobDetailsStep({ form }: JobDetailsStepProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  
  const selectedDepartment = watch('department');
  const selectedJobType = watch('jobType');
  const dateOfBirth = watch('dateOfBirth');
  const startDate = watch('startDate');

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
    setMaxDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  }, []);

  const filteredManagers = mockManagers.filter(
    manager => manager.department === selectedDepartment
  );

  const getSalaryPlaceholder = () => {
    if (selectedJobType === 'Contract') {
      return '$75 (hourly rate)';
    }
    return '$65,000 (annual salary)';
  };

  const validateSalary = (value: number) => {
    if (selectedJobType === 'Contract') {
      return value >= 50 && value <= 150;
    }
    return value >= 30000 && value <= 200000;
  };

  // Validate weekend restriction
  const isWeekendStartDate = startDate && isWeekend(startDate) && 
    (selectedDepartment === 'HR' || selectedDepartment === 'Finance');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>
          Information about your role and employment terms.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="department">Department *</Label>
          <Select value={selectedDepartment} onValueChange={(value) => setValue('department', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && (
            <p className="text-sm text-red-600 mt-1">{errors.department.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="positionTitle">Position Title *</Label>
          <Input
            id="positionTitle"
            {...register('positionTitle')}
            placeholder="e.g., Senior Software Engineer"
            className="mt-1"
          />
          {errors.positionTitle && (
            <p className="text-sm text-red-600 mt-1">{errors.positionTitle.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            {...register('startDate')}
            className="mt-1"
            min={minDate}
            max={maxDate}
          />
          {errors.startDate && (
            <p className="text-sm text-red-600 mt-1">{errors.startDate.message}</p>
          )}
          {isWeekendStartDate && (
            <p className="text-sm text-red-600 mt-1">
              HR and Finance departments cannot start on weekends
            </p>
          )}
        </div>

        <div>
          <Label>Job Type *</Label>
          <RadioGroup
            value={selectedJobType}
            onValueChange={(value) => setValue('jobType', value as any)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Full-time" id="full-time" />
              <Label htmlFor="full-time">Full-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Part-time" id="part-time" />
              <Label htmlFor="part-time">Part-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Contract" id="contract" />
              <Label htmlFor="contract">Contract</Label>
            </div>
          </RadioGroup>
          {errors.jobType && (
            <p className="text-sm text-red-600 mt-1">{errors.jobType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="salaryExpectation">
            Salary Expectation * 
            {selectedJobType === 'Contract' ? ' ($50-$150/hour)' : ' ($30,000-$200,000/year)'}
          </Label>
          <Input
            id="salaryExpectation"
            type="number"
            {...register('salaryExpectation', { 
              valueAsNumber: true,
              validate: validateSalary
            })}
            placeholder={getSalaryPlaceholder()}
            className="mt-1"
          />
          {errors.salaryExpectation && (
            <p className="text-sm text-red-600 mt-1">{errors.salaryExpectation.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="manager">Manager *</Label>
          <Select
            value={watch('manager')}
            onValueChange={(value) => setValue('manager', value)}
            disabled={!selectedDepartment}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={
                selectedDepartment ? "Select a manager" : "Select department first"
              } />
            </SelectTrigger>
            <SelectContent>
              {filteredManagers.map((manager) => (
                <SelectItem key={manager.id} value={manager.id}>
                  {manager.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.manager && (
            <p className="text-sm text-red-600 mt-1">{errors.manager.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}