import { useState } from 'react'
import './App.css'

function App() {
  const [ferryInfo, setFerryInfo] = useState([]);

  const atApiUrl = 'https://pp-api.at.govt.nz/realtime/legacy/ferrypositions';

  const getFerryPosition = async () => {
    const response = await fetch(atApiUrl, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': import.meta.env.VITE_AT_SUBSCRIPTION_KEY,
      }
    });

    const data = await response.json();
    setFerryInfo(data.response);

    console.log(data)
  }

  const submit = async () => {
    await getFerryPosition()
  }

  return (
    <>
      <h1>Ferry Positions</h1>
      <div className="userInput">
        <button
          onClick={submit}
          className="submitBtn"
        >Submit
        </button>
      </div>

      <div>
        <ul>
          {ferryInfo.map((ferryInfo, index) => (
            <li key={index}>
              <p>Vessel Name: {ferryInfo.vessel || 'N/A'}</p>
              <p>Call Sign: {ferryInfo.callsign || 'N/A'}</p>
              <p>Operator Name: {ferryInfo.operator || 'N/A'}</p>
              <p>Longitude: {ferryInfo.lng || 'N/A'}</p>
              <p>Latitude: {ferryInfo.lat || 'N/A'}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
