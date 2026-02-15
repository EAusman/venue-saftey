import { useState } from 'react';
import { Welcome } from './pages/Welcome';
import { VenuesList } from './pages/VenuesList';
import { VenueDetail } from './pages/VenueDetail';
import './App.css';

type Screen = 'welcome' | 'venues' | 'detail';

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedVenueId, setSelectedVenueId] = useState<string>('');

  const handleEnter = () => {
    setScreen('venues');
  };

  const handleVenueSelect = (venueId: string) => {
    setSelectedVenueId(venueId);
    setScreen('detail');
  };

  const handleBackToVenues = () => {
    setScreen('venues');
    setSelectedVenueId('');
  };

  return (
    <div className="app">
      {screen === 'welcome' && <Welcome onEnter={handleEnter} />}
      {screen === 'venues' && <VenuesList onVenueSelect={handleVenueSelect} />}
      {screen === 'detail' && <VenueDetail venueId={selectedVenueId} onBack={handleBackToVenues} />}
    </div>
  );
}

export default App;
