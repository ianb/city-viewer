import { useState, useEffect } from 'preact/hooks';
import { createHashHistory } from 'history';
import Router from "preact-router";
import { CityModel } from "./model";
import { Home, About } from "./home";
import { Overview } from "./overview";
import { Faction, FactionMember } from "./faction";
import { Neighborhood, Building, BuildingPerson, Landmark } from "./neighborhood";

const history = createHashHistory();

const App = () => {
  const [city, setCity] = useState(null);
  const [cityProperties, setCityProperties] = useState(null);
  useEffect(() => {
    document.body.classList.add("h-screen");
  }, []);
  useEffect(() => {
    fetch("/assets/veilvale.json")
      .then(response => response.json())
      .then(data => setCity(data));
    fetch("/assets/properties.json")
      .then(response => response.json())
      .then(data => setCityProperties(data));
  }, []);
  if (city === null || cityProperties === null) {
    return <Loading />;
  }
  const cityModel = new CityModel(city, cityProperties);
  return <City city={cityModel} />;
};

const Loading = () => {
  return <div>Loading...</div>;
}

const City = ({ city }) => {
  return <Router history={history}>
    <Home city={city} path="/" />
    <About city={city} path="/about" />
    <Overview city={city} path="/city" />
    <Faction city={city} path="/faction/:faction" />
    <FactionMember city={city} path="/faction/:faction/person/:person" />
    <Neighborhood city={city} path="/neighborhood/:neighborhood" />
    <Building city={city} path="/neighborhood/:neighborhood/building/:building" />
    <BuildingPerson city={city} path="/neighborhood/:neighborhood/building/:building/person/:person" />
    <Landmark city={city} path="/neighborhood/:neighborhood/landmark/:landmark" />
    <NotFound default />
  </Router>
};

const NotFound = () => {
  return <div>Not found</div>;
};

export default App;
