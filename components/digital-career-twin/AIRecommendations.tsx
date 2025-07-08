import React from 'react';
import { DigitalTwinProfile } from './types';

interface AIRecommendationsProps {
  profile: DigitalTwinProfile;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ profile }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold mb-2">AI Recommendations</h3>
    <p>AI-generated feedback and next steps will appear here based on your evolving profile.</p>
  </div>
);

export default AIRecommendations; 