import { useState } from "react";
import { useCountry } from "./hooks/hooks";

const App = () => {
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(e.target.country.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        find country <input name="country" />
        <button>search</button>
      </form>

      {country === null ? null : country.found ? (
        <div>
          <h3>{country.data.name.common}</h3>
          <div>capital {country.data.capital?.[0]}</div>
          <div>population {country.data.population}</div>
          <img src={country.data.flags.png} height="100" />
        </div>
      ) : (
        <p>not found...</p>
      )}
    </div>
  );
};

export default App;
