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
    setFerryInfo(data.response[0]);

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
        <h2>Vessel Name: {ferryInfo.vessel || 'N/A'}</h2>
        <p>Call Sign: {ferryInfo.callsign || 'N/A'}</p>
        <p>Operator Name: {ferryInfo.operator || 'N/A'}</p>
        <p>Longitude: {ferryInfo.lng || 'N/A'}</p>
        <p>Latitude: {ferryInfo.lat || 'N/A'}</p>
      </div>
    </>
  )
}

export default App
