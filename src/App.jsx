import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import eventData from './data.json';
import Timeline from './components/Timeline';
import EventDetailsPage from './components/EventDetailsPage';
import ToggleSwitch from './components/ToggleSwitch';
import { getHistoricalEvents } from './services/covic.service';
//import AuroraBackground from './components/ui/aurora-background';

function App() {
  const [category, setCategory] = useState('terror');
  const [location, setLocation] = useState('all');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [yearRange, setYearRange] = useState({ start: 1900, end: new Date().getFullYear() });


  useEffect(() => {
    getHistoricalEvents(
        "1999-01-01",
       "2100-01-01",
       category
    ).then((e) => {
      console.log(e)
      setEvents(e)
      setFilteredEvents(e)
    }) 
  },[category])

  const handleYearRangeChange = (event) => {
    const { name, value } = event.target;
    setYearRange(prevRange => ({
      ...prevRange,
      [name]: parseInt(value)
    }));
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  useEffect(() => {
    let filtered = [];
    filtered = filtered.filter(event => {
      const eventYear = +event.year
      return eventYear >= yearRange.start && eventYear <= yearRange.end;
    });

    filtered.sort((a, b) => +a.year - +b.year);

    setFilteredEvents(filtered);
    setEvents(filtered);
  }, [category, location, yearRange]);

  const generateYearOptions = (start, end) => {
    const options = [];
    for (let year = start; year <= end; year += 10) {
      options.push(<option key={year} value={year}>{year}</option>);
    }
    return options;
  };

  

  return (
    <Router>
      <div className={`App ${isNightMode ? 'night-mode' : 'day-mode'}`}>
        <ToggleSwitch isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
        <header className="App-header">
          <div>
            <label>
              Start Year:
              <select
                name="start"
                value={yearRange.start}
                onChange={handleYearRangeChange}
              >
                {generateYearOptions(1900, new Date().getFullYear())}
              </select>
            </label>
            <label>
              End Year:
              <select
                name="end"
                value={yearRange.end}
                onChange={handleYearRangeChange}
              >
                {generateYearOptions(1900, new Date().getFullYear())}
              </select>
            </label>


          </div>
          <Routes>
            <Route path="/" element={<Timeline events={filteredEvents} isNightMode={isNightMode} />} />
            <Route path="/event/:eventId" element={<EventDetailsPage events={events} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
