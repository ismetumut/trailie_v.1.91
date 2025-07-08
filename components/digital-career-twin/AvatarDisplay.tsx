import React from 'react';

interface AvatarDisplayProps {
  avatarUrl: string;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ avatarUrl }) => (
  <div className="flex flex-col items-center">
    <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-gray-300" />
    <span className="mt-2 text-sm text-gray-600">Your Digital Twin</span>
  </div>
);

export default AvatarDisplay; 