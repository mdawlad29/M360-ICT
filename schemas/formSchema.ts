import { z } from "zod";
import { departments } from "@/data/mockData";

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .refine((name) => name.trim().split(" ").length >= 2, {
      message: "Full name must have at least 2 words",
    }),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Phone number must be in format +1-123-456-7890"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          return age - 1 >= 18;
        }
        return age >= 18;
      },
      {
        message: "Must be at least 18 years old",
      }
    ),
  profilePicture: z.any().optional(),
});

export const jobDetailsSchema = z.object({
  department: z.enum(departments as [string, ...string[]], {
    required_error: "Please select a department",
  }),
  positionTitle: z
    .string()
    .min(3, "Position title must be at least 3 characters"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine(
      (date) => {
        const startDate = new Date(date);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 90);

        return startDate >= today && startDate <= maxDate;
      },
      {
        message: "Start date must be within 90 days from today",
      }
    )
    .refine((date) => {
      // Additional validation will be added in the component for weekends
      return true;
    }),
  jobType: z.enum(["Full-time", "Part-time", "Contract"], {
    required_error: "Please select a job type",
  }),
  salaryExpectation: z.number().min(1, "Salary expectation is required"),
  manager: z.string().min(1, "Please select a manager"),
});

export const skillsPreferencesSchema = z.object({
  primarySkills: z.array(z.string()).min(3, "Please select at least 3 skills"),
  skillExperience: z.record(z.number().min(0).max(20)),
  preferredWorkingHours: z.object({
    start: z.string().min(1, "Start time is required"),
    end: z.string().min(1, "End time is required"),
  }),
  remoteWorkPreference: z.number().min(0).max(100),
  managerApproved: z.boolean().optional(),
  extraNotes: z
    .string()
    .max(500, "Notes must be under 500 characters")
    .optional(),
});

export const emergencyContactSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  relationship: z.string().min(1, "Please select a relationship"),
  contactPhone: z
    .string()
    .regex(phoneRegex, "Phone number must be in format +1-123-456-7890"),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
});

export const reviewSubmitSchema = z.object({
  confirmCorrect: z.boolean().refine((val) => val === true, {
    message: "You must confirm the information is correct",
  }),
});

export const completeFormSchema = personalInfoSchema
  .merge(jobDetailsSchema)
  .merge(skillsPreferencesSchema)
  .merge(emergencyContactSchema)
  .merge(reviewSubmitSchema);
