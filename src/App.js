import Form from "./components/Form";
import Table from "./components/Table";
import './App.css';
import { useState } from 'react';

const App = () => {
  const [flightData, setFlightData] = useState([]);

  const onClear = () => setFlightData([]);

  const getFlightData = (options) => {
    setFlightData([]);

    const { departureDate, from, to, country, currency, lang } = options;

    for (const fromItem of from) {
        for (const toItem of to) {
            fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${lang}/${fromItem.PlaceId}/${toItem.PlaceId}/${departureDate}`, {
                headers: {
                    "x-rapidapi-key": "ab45838c7cmsh9ac1edb62d199a4p1e3ca7jsnc9b68cdbfc9f",
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "useQueryString": true
                },
            }).then(data => data.json()).then(data => {
                flightData.push({...data, Places: { from: fromItem.PlaceId, to: toItem.PlaceId }});
                setFlightData(flightData);
            })
        }
    }
  };
  
  return (
    <div className="App">
        <Form getFlightData={getFlightData} onClear={onClear} />
        <Table flightData={flightData}/>
    </div>
  );
}

export default App;
