import { FormData } from '@/types/form';

export function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function isWeekend(date: string): boolean {
  const day = new Date(date).getDay();
  return day === 5 || day === 6; // Friday or Saturday
}

export function formatSalary(amount: number, jobType: string): string {
  if (jobType === 'Contract') {
    return `$${amount}/hour`;
  }
  return `$${amount.toLocaleString()}/year`;
}

export function getDefaultFormData(): Partial<FormData> {
  return {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    department: '',
    positionTitle: '',
    startDate: '',
    jobType: 'Full-time',
    salaryExpectation: 50000,
    manager: '',
    primarySkills: [],
    skillExperience: {},
    preferredWorkingHours: {
      start: '09:00',
      end: '17:00',
    },
    remoteWorkPreference: 0,
    extraNotes: '',
    contactName: '',
    relationship: '',
    contactPhone: '',
    confirmCorrect: false,
  };
}