import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import eventData from './data.json';
import Timeline from './components/Timeline';
import EventDetailsPage from './components/EventDetailsPage';
import ToggleSwitch from './components/ToggleSwitch';
import { getHistoricalEvents } from './services/covic.service';
//import AuroraBackground from './components/ui/aurora-background';
const allCategories = ["terror", "disasters"]
function App() {
  const [category, setCategory] = useState('terror');
  const [location, setLocation] = useState('all');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [yearRange, setYearRange] = useState({ start: 1900, end: new Date().getFullYear() });
  const [startDate, setStartDate] = useState(new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000 /* 20 years back */));
  const [endDate, setEndDate] = useState(new Date(Date.now() + 20 * 365 * 24 * 60 * 60 * 1000) /* 20 years forward */);


  const [loading,setLoading] = useState(false)
  const countries = useMemo(() => [...new Set(events.map(e => e.country)), "all"], [ events ])
  const [country,setCountry] = useState(null)

  useEffect(() => {
    if(country ){
      if(country === 'all') {
        setFilteredEvents(events)
        return
      }
      setFilteredEvents(events.filter(e => e.country === country))
    }
    else {
      setFilteredEvents(events)
    }
  },[country, events])


  useEffect(() => {
    setLoading(true)
    getHistoricalEvents(
        "1999-01-01",
        "2100-01-01",
       category
    ).then((e) => {
      console.log(e)
      setEvents(e)
      setFilteredEvents(e)
      setCountry('all')
    }) 
    .finally(() => setLoading(false))
  },[category,startDate, endDate])

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
            <p style={{color: isNightMode? 'white' : 'black'}}>Country</p>
            <select onChange={(e) => setCountry(e.target.value)}>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>


            <p style={{color: isNightMode? 'white' : 'black'}}>Category</p>
            <select onChange={(e) => setCategory(e.target.value)}>
              {allCategories.map(c => <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>)}
            </select>

          </div>
           <h3 className='text-black block p-4 text-[24px]' style={{color: isNightMode? 'white' : 'black'}}>
           Category: { category[0].toUpperCase() + category.slice(1)},
           Country :{country}
           </h3> 
          <Routes>
            <Route path="/" element={ loading ? <h3 className='text-black block p-4 text-[24px] min-h-[1000px]'>{"Loading..."}</h3> : <Timeline events={filteredEvents} isNightMode={isNightMode} />} />
            <Route path="/event/:eventId" element={<EventDetailsPage events={events} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
