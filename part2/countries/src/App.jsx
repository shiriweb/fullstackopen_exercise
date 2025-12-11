import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CountryDetails from './component/CountryDetails';
import CountryList from './component/CountryList';



const App =() => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data));
  }, []);

  const handleFilterChange =(event) =>{
    setFilter(event.target.value);
    setSelectedCountry(null); 
  }

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <h1>Country Finder</h1>  
      <input value={filter} onChange={handleFilterChange} placeholder='search country ...'/>
    
      {
        filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
            <CountryDetails country={filteredCountries[0]} />
        ) : ( 
            <CountryList countries={filteredCountries} setSelectedCountry={setSelectedCountry} />
        )
      }

      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </>


  );
}

export default App;