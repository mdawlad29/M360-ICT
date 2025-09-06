"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockManagers } from "@/data/mockData";
import { formatSalary, calculateAge } from "@/utils/formUtils";

interface ReviewSubmitStepProps {
  form: UseFormReturn<FormData>;
}

export function ReviewSubmitStep({ form }: ReviewSubmitStepProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const formData = watch();

  const selectedManager = mockManagers.find((m) => m.id === formData.manager);
  const age = formData.dateOfBirth ? calculateAge(formData.dateOfBirth) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
        <CardDescription>
          Please review all information before submitting your onboarding form.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Full Name:</span>
              <p className="text-gray-700">{formData.fullName}</p>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <p className="text-gray-700">{formData.email}</p>
            </div>
            <div>
              <span className="font-medium">Phone:</span>
              <p className="text-gray-700">{formData.phoneNumber}</p>
            </div>
            <div>
              <span className="font-medium">Date of Birth:</span>
              <p className="text-gray-700">
                {formData.dateOfBirth} (Age: {age})
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Job Details */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Department:</span>
              <p className="text-gray-700">{formData.department}</p>
            </div>
            <div>
              <span className="font-medium">Position:</span>
              <p className="text-gray-700">{formData.positionTitle}</p>
            </div>
            <div>
              <span className="font-medium">Start Date:</span>
              <p className="text-gray-700">{formData.startDate}</p>
            </div>
            <div>
              <span className="font-medium">Job Type:</span>
              <p className="text-gray-700">{formData.jobType}</p>
            </div>
            <div>
              <span className="font-medium">Salary:</span>
              <p className="text-gray-700">
                {formatSalary(
                  formData.salaryExpectation || 0,
                  formData.jobType || ""
                )}
              </p>
            </div>
            <div>
              <span className="font-medium">Manager:</span>
              <p className="text-gray-700">{selectedManager?.name}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Skills & Preferences */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Skills & Preferences</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Primary Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.primarySkills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {skill} ({formData.skillExperience?.[skill] || 0}yr)
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Working Hours:</span>
                <p className="text-gray-700">
                  {formData.preferredWorkingHours?.start} -{" "}
                  {formData.preferredWorkingHours?.end}
                </p>
              </div>
              <div>
                <span className="font-medium">Remote Work:</span>
                <p className="text-gray-700">
                  {formData.remoteWorkPreference}%
                </p>
              </div>
            </div>
            {formData.managerApproved && (
              <div>
                <span className="font-medium text-green-600">
                  ✓ Manager Approved Remote Work
                </span>
              </div>
            )}
            {formData.extraNotes && (
              <div>
                <span className="font-medium">Additional Notes:</span>
                <p className="text-gray-700 italic">{formData.extraNotes}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Emergency Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Contact Name:</span>
              <p className="text-gray-700">{formData.contactName}</p>
            </div>
            <div>
              <span className="font-medium">Relationship:</span>
              <p className="text-gray-700">{formData.relationship}</p>
            </div>
            <div>
              <span className="font-medium">Phone:</span>
              <p className="text-gray-700">{formData.contactPhone}</p>
            </div>
            {age < 21 && formData.guardianName && (
              <>
                <div>
                  <span className="font-medium">Guardian Name:</span>
                  <p className="text-gray-700">{formData.guardianName}</p>
                </div>
                <div>
                  <span className="font-medium">Guardian Phone:</span>
                  <p className="text-gray-700">{formData.guardianPhone}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="confirmCorrect"
            checked={formData.confirmCorrect || false}
            onCheckedChange={(checked) =>
              setValue("confirmCorrect", checked as boolean)
            }
          />
          <Label htmlFor="confirmCorrect" className="text-sm">
            I confirm that all the information provided above is correct *
          </Label>
        </div>
        {errors.confirmCorrect && (
          <p className="text-sm text-red-600">
            {errors.confirmCorrect.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
