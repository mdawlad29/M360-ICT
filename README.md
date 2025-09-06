# Employee Onboarding Form

A sophisticated multi-step form built with Next.js, React Hook Form, and Zod validation for seamless employee onboarding.

## Features

### Core Functionality

- **5-Step Process**: Personal Info → Job Details → Skills & Preferences → Emergency Contact → Review & Submit
- **Smart Validation**: Real-time validation with Zod schemas and conditional logic
- **Dynamic Fields**: Form fields change based on user selections (department, age, job type, etc.)
- **Progress Tracking**: Visual progress indicator with step validation status
- **Form Persistence**: Auto-saves form state in React state with unsaved changes warning

### Smart Logic Implementation

#### Conditional Validation

- **Age-based validation**: Guardian contact required for employees under 21
- **Department-based restrictions**: HR and Finance cannot start on weekends
- **Salary validation**: Different ranges for full-time ($30K-$200K) vs contract ($50-$150/hour)
- **Remote work approval**: Manager approval required when remote preference > 50%

#### Dynamic Field Visibility

- **Manager filtering**: Manager dropdown filtered by selected department
- **Skills filtering**: Available skills change based on department
- **Guardian contact**: Additional fields appear for employees under 21
- **Manager approval**: Checkbox appears when remote work preference > 50%

#### Cross-step Dependencies

- Manager selection depends on department choice
- Skill options depend on department selection
- Guardian contact visibility depends on calculated age
- Salary validation depends on job type selection

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technical Architecture

### File Organization

- `types/`: TypeScript interfaces and type definitions
- `schemas/`: Zod validation schemas for each form step
- `hooks/`: Custom React hooks for form logic and navigation
- `components/forms/`: Individual step components
- `data/`: Mock data for managers and skills
- `utils/`: Utility functions for calculations and formatting

### Custom Hooks

- `useFormNavigation`: Handles step navigation and validation
- `useFormValidation`: Centralized validation logic for all steps

### Design Patterns

- **Single Responsibility**: Each step component handles only its specific fields
- **Separation of Concerns**: Validation, navigation, and UI are separated
- **Reusable Components**: Progress indicator and navigation are reusable
- **Type Safety**: Full TypeScript coverage with strict validation

## Assumptions Made

1. **Phone Format**: Used US-style phone format (+1-123-456-7890) for consistency
2. **Weekend Definition**: Friday and Saturday considered weekends for HR/Finance restriction
3. **Manager Approval**: Checkbox validation for remote work > 50% instead of actual manager integration
4. **File Upload**: Profile picture validation done client-side for demo purposes
5. **Submit Action**: Console logging instead of actual API integration

## Business Logic Highlights

- **Age Calculation**: Precise age calculation accounting for month/day differences
- **Date Validation**: Complex start date validation with weekend restrictions
- **Dynamic Salary**: Automatic salary range switching based on job type
- **Skill Experience**: Automatic experience tracking for selected skills
- **Progress Validation**: Step-by-step validation preventing progression with errors

The form demonstrates enterprise-level complexity with intuitive user experience and robust validation.
# M360-ICT
