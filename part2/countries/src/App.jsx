import { useState, useEffect } from "react";
import countriesService from "./services/country";
import SpecificCountry from "./components/SpecificCountry";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries.map((c) => c.name.common));
    });
  }, []);

  const search = (e) => {
    setSearchTerm(e.target.value);
    console.log();
  };

  const displayCountryList = () => {
    const filteredCountries = countries.filter((c) =>
      c.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length === 1) {
      return <SpecificCountry name={filteredCountries[0]} />;
    } else {
      return filteredCountries.map((c, i) => {
        return (
          <div key={i} style={{ display: "flex" }}>
            <p>{c}</p>
            <button onClick={() => setSearchTerm(c)}>show</button>
          </div>
        );
      });
    }
  };

  return (
    <main>
      <div style={{ display: "flex" }}>
        <p style={{ marginRight: "5px" }}>find countries</p>
        <input value={searchTerm} onChange={search} />
      </div>
      <div>{displayCountryList()}</div>
    </main>
  );
}

export default App;
