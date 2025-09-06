'use client';

import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData, StepValidation } from '@/types/form';

export function useFormValidation(form: UseFormReturn<FormData>) {
  const validateStep = useCallback((step: number): StepValidation => {
    const formData = form.getValues();
    const errors: string[] = [];

    switch (step) {
      case 1: {
        if (!formData.fullName || formData.fullName.trim().split(' ').length < 2) {
          errors.push('Full name must have at least 2 words');
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.push('Please enter a valid email address');
        }
        if (!formData.phoneNumber || !/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(formData.phoneNumber)) {
          errors.push('Phone number must be in format +1-123-456-7890');
        }
        if (formData.dateOfBirth) {
          const birthDate = new Date(formData.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18) {
            errors.push('Must be at least 18 years old');
          }
        } else {
          errors.push('Date of birth is required');
        }
        break;
      }
      case 2: {
        if (!formData.department) {
          errors.push('Please select a department');
        }
        if (!formData.positionTitle || formData.positionTitle.length < 3) {
          errors.push('Position title must be at least 3 characters');
        }
        if (!formData.startDate) {
          errors.push('Start date is required');
        } else {
          const startDate = new Date(formData.startDate);
          const today = new Date();
          const maxDate = new Date();
          maxDate.setDate(today.getDate() + 90);
          
          if (startDate < today || startDate > maxDate) {
            errors.push('Start date must be within 90 days from today');
          }
          
          // Weekend validation for HR and Finance
          if ((formData.department === 'HR' || formData.department === 'Finance') && 
              (startDate.getDay() === 5 || startDate.getDay() === 6)) {
            errors.push('HR and Finance departments cannot start on weekends');
          }
        }
        if (!formData.jobType) {
          errors.push('Please select a job type');
        }
        if (!formData.salaryExpectation || formData.salaryExpectation <= 0) {
          errors.push('Salary expectation is required');
        }
        if (!formData.manager) {
          errors.push('Please select a manager');
        }
        break;
      }
      case 3: {
        if (!formData.primarySkills || formData.primarySkills.length < 3) {
          errors.push('Please select at least 3 skills');
        }
        if (!formData.preferredWorkingHours?.start || !formData.preferredWorkingHours?.end) {
          errors.push('Working hours are required');
        }
        if (formData.remoteWorkPreference > 50 && !formData.managerApproved) {
          errors.push('Manager approval required for remote work > 50%');
        }
        break;
      }
      case 4: {
        if (!formData.contactName) {
          errors.push('Contact name is required');
        }
        if (!formData.relationship) {
          errors.push('Please select a relationship');
        }
        if (!formData.contactPhone || !/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(formData.contactPhone)) {
          errors.push('Contact phone number must be in format +1-123-456-7890');
        }
        
        // Check if guardian contact is needed
        if (formData.dateOfBirth) {
          const birthDate = new Date(formData.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          
          if (age < 21) {
            if (!formData.guardianName || !formData.guardianPhone) {
              errors.push('Guardian contact is required for employees under 21');
            }
          }
        }
        break;
      }
      case 5: {
        if (!formData.confirmCorrect) {
          errors.push('You must confirm the information is correct');
        }
        break;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [form]);

  return { validateStep };
}