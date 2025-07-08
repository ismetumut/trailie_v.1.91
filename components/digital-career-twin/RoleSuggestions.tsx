import React from 'react';
import { RoleSuggestion } from './types';

interface RoleSuggestionsProps {
  suggestions: RoleSuggestion[];
}

const RoleSuggestions: React.FC<RoleSuggestionsProps> = ({ suggestions }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold mb-2">Role Suggestions</h3>
    <ul>
      {suggestions.map((role, idx) => (
        <li key={idx} className="mb-1">
          <span className="font-medium">{role.title}</span> - Match: {role.matchScore}%
          {role.simulationAvailable && <span className="ml-2 text-green-600">[Simulation]</span>}
        </li>
      ))}
    </ul>
  </div>
);

export default RoleSuggestions; 