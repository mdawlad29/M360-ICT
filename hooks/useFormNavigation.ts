'use client';

import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types/form';
import { useFormValidation } from './useFormValidation';

export function useFormNavigation(form: UseFormReturn<FormData>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { validateStep } = useFormValidation(form);

  const nextStep = useCallback(() => {
    const validation = validateStep(currentStep);
    if (validation.isValid && currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      setHasUnsavedChanges(false);
    }
    return validation;
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    // Can only go to previous steps or current step
    if (step <= currentStep && step >= 1) {
      setCurrentStep(step);
    }
  }, [currentStep]);

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    validateStep,
  };
}