export interface FormData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture?: File;

  // Step 2: Job Details
  department: string;
  positionTitle: string;
  startDate: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  salaryExpectation: number;
  manager: string;

  // Step 3: Skills & Preferences
  primarySkills: string[];
  skillExperience: Record<string, number>;
  preferredWorkingHours: {
    start: string;
    end: string;
  };
  remoteWorkPreference: number;
  managerApproved?: boolean;
  extraNotes?: string;

  // Step 4: Emergency Contact
  contactName: string;
  relationship: string;
  contactPhone: string;
  guardianName?: string;
  guardianPhone?: string;

  // Step 5: Review & Submit
  confirmCorrect: boolean;
}

export interface Manager {
  id: string;
  name: string;
  department: string;
}

export interface StepValidation {
  isValid: boolean;
  errors: string[];
}