export interface Step1 {
  fullName: string;
  address: string;
  phoneNumber: string;
}

export interface Step3 {
  receiveEmails: boolean;
  receiveSms: boolean;
  canBeMobilized: boolean;
  canBeContacted: boolean;
  ghostMode: boolean;
}

export interface Step4 {
  bio: string;
  linkedinProfile: string;
  languages: string[];
  yearsOfExperience: number | null;
  expertise: string[];
  availability: string;
}

export interface WizardData {
  step1: Step1;
  step2: { photo: File | null };
  step3: Step3;
  step4: Step4;
}
