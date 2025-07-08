import React from 'react';
import { DigitalTwinProfile } from './types';

interface SkillsEditorProps {
  profile: DigitalTwinProfile;
  onUpdate: (profile: DigitalTwinProfile) => void;
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ profile, onUpdate }) => {
  const handleAddSkill = () => {
    const updated = { ...profile, skills: [...profile.skills, 'New Skill'] };
    onUpdate(updated);
  };

  const handleRemoveSkill = (idx: number) => {
    const updated = { ...profile, skills: profile.skills.filter((_, i) => i !== idx) };
    onUpdate(updated);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Skills & Competencies</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {profile.skills.map((skill, idx) => (
          <span key={idx} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {skill}
            <button
              className="ml-2 text-blue-400 hover:text-red-500 focus:outline-none"
              onClick={() => handleRemoveSkill(idx)}
              title="Kaldır"
              type="button"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleAddSkill}>
        Add Skill (Demo)
      </button>
    </div>
  );
};

export default SkillsEditor; 