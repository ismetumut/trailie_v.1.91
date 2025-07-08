import React from 'react';
import { DigitalTwinProfile } from './types';

interface CareerSimulationsProps {
  profile: DigitalTwinProfile;
}

const CareerSimulations: React.FC<CareerSimulationsProps> = ({ profile }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold mb-2">Career Simulations</h3>
    <p>Scenario-based simulations will be available for roles matching your profile.</p>
  </div>
);

export default CareerSimulations; 