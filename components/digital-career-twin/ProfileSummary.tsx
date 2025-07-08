import React from 'react';
import { DigitalTwinProfile } from './types';

interface ProfileSummaryProps {
  profile: DigitalTwinProfile;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ profile }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold mb-2">Profile Summary</h3>
    <div><strong>Personality:</strong> {profile.personality}</div>
    <div><strong>Current Role:</strong> {profile.currentRole}</div>
    <div><strong>Competencies:</strong> {profile.competencies.join(', ')}</div>
    <div><strong>Skills:</strong> {profile.skills.join(', ')}</div>
    <div><strong>Career Goals:</strong> {profile.careerGoals.join(', ')}</div>
    <div><strong>Preferences:</strong> {profile.preferences.join(', ')}</div>
  </div>
);

export default ProfileSummary; 