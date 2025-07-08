export interface DigitalTwinProfile {
  avatarUrl: string;
  personality: string;
  competencies: string[];
  skills: string[];
  careerGoals: string[];
  preferences: string[];
  currentRole: string;
}

export interface RoleSuggestion {
  title: string;
  matchScore: number;
  requiredSkills: string[];
  simulationAvailable: boolean;
} 