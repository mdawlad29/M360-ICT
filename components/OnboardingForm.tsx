"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/types/form";
import { completeFormSchema } from "@/schemas/formSchema";
import { getDefaultFormData } from "@/utils/formUtils";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { PersonalInfoStep } from "./forms/PersonalInfoStep";
import { JobDetailsStep } from "./forms/JobDetailsStep";
import { SkillsPreferencesStep } from "./forms/SkillsPreferencesStep";
import { EmergencyContactStep } from "./forms/EmergencyContactStep";
import { ReviewSubmitStep } from "./forms/ReviewSubmitStep";
import { ProgressIndicator } from "./forms/ProgressIndicator";
import { FormNavigation } from "./forms/FormNavigation";

export function OnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepValidation, setStepValidation] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const form = useForm<FormData>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: getDefaultFormData(),
    mode: "onChange",
  });

  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    validateStep,
  } = useFormNavigation(form);

  // Update validation status when form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasUnsavedChanges(true);
      const newValidation = Array.from({ length: 5 }, (_, i) => {
        const stepValidation = validateStep(i + 1);
        return stepValidation.isValid;
      });
      setStepValidation(newValidation);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, validateStep]);

  // Warning for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleNext = () => {
    const validation = nextStep();
    if (!validation.isValid) {
      validation.errors.forEach((error) => {
        console.error("Validation error:", error);
      });
    }
  };

  const handleSubmit = async () => {
    const validation = validateStep(5);
    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const submissionData = form.getValues();
    console.log("Form submitted:", submissionData);
    alert("Application submitted successfully! Welcome to the team!");

    setIsSubmitting(false);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <JobDetailsStep form={form} />;
      case 3:
        return <SkillsPreferencesStep form={form} />;
      case 4:
        return <EmergencyContactStep form={form} />;
      case 5:
        return <ReviewSubmitStep form={form} />;
      default:
        return null;
    }
  };

  const canProceed = stepValidation[currentStep - 1];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Employee Onboarding
        </h1>
        <p className="text-gray-600">
          Welcome! Please complete this form to begin your journey with us.
        </p>
      </div>

      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={5}
        stepValidation={stepValidation}
        onStepClick={goToStep}
      />

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            const validation = validateStep(currentStep);

            if (validation.isValid) {
              if (currentStep < 5) {
                handleNext();
              } else {
                form.handleSubmit(handleSubmit)();
              }
            } else {
              console.log("Validation failed:", validation.errors);
            }
          }
        }}
        className="space-y-6"
      >
        {renderCurrentStep()}

        <FormNavigation
          currentStep={currentStep}
          totalSteps={5}
          canProceed={canProceed}
          onPrevious={prevStep}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
