'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepValidation: boolean[];
  onStepClick: (step: number) => void;
}

const stepTitles = [
  'Personal Info',
  'Job Details',
  'Skills & Preferences',
  'Emergency Contact',
  'Review & Submit',
];

export function ProgressIndicator({ 
  currentStep, 
  totalSteps, 
  stepValidation,
  onStepClick 
}: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep && stepValidation[index];
          const isCurrent = stepNumber === currentStep;
          const isClickable = stepNumber <= currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(stepNumber)}
                  disabled={!isClickable}
                  className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200',
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : isClickable
                          ? 'border-gray-300 text-gray-500 hover:border-gray-400'
                          : 'border-gray-200 text-gray-300 cursor-not-allowed'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </button>
                <span className={cn(
                  'mt-2 text-xs text-center max-w-20',
                  isCurrent ? 'text-blue-600 font-medium' : 'text-gray-500'
                )}>
                  {stepTitles[index]}
                </span>
              </div>
              
              {index < totalSteps - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-4',
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}