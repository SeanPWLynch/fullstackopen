import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => {

  if (weather) {
    return (
      <div>
        <p>Temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} width="250px"></img>
        <p>Wind: {weather.current.wind_speed}km/h {weather.current.wind_dir}</p>

      </div>
    )
  }
  else {
    return (
      <div>
        Getting Weather Data...
      </div>
    )
  }

}

const Filter = ({ changeHandler, filter }) => {

  return (
    <div>
      Find Countries: <input onChange={changeHandler} value={filter} />
    </div>
  )
}

const Countries = ({ countryList, countryFilter, showHandler, weather }) => {

  if (countryList.length > 9) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countryList.length > 1 && countryList.length < 8) {
    return (
      <div>
        {
          countryList.map(country =>
            <div>
              <p key={country.name}>{country.name} <button value={country.name} onClick={showHandler}>Show</button></p>
            </div>
          )
        }
      </div >
    )
  }
  else if (countryList.length === 1) {
    return (
      <div>
        <Country country={countryList[0]}
          weather={weather} />
      </div>
    )
  }
  else {
    return (
      <p>No match found for: {countryFilter}</p>
    )
  }
}

const Country = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
      <h3>Flag</h3>
      <img src={country.flag} width="250px" alt="Country Flag"></img>
      <h3>Weather in {country.capital}</h3>
      <Weather weather={weather} />
    </div>
  )

}

const App = () => {

  const getCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('API Response: ', response.data);
        setCountries(response.data)
      })
  }

  const getWeather = () => {

    const params = {
      access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
      query: countriesToShow[0].name + ", " + countriesToShow[0].capital
    }

    console.log(params)

    axios.get('http://api.weatherstack.com/current', { params })
      .then(response => {
        const apiResponse = response.data
        setWeather(response.data)
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`)
      }).catch(error => {
        console.log(error)
      });
  }

  useEffect(getCountries, [])

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [weather, setWeather] = useState()

  const handleCountryNameFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  const handleShowCountryButton = (event) => {
    console.log(event)
    setCountryFilter(event.target.value)
    getWeather()
  }

  const countriesToShow = countryFilter === '' ? countries : countries.filter(country => country.name.toUpperCase().includes(countryFilter.toUpperCase()))

  return (
    <div>
      <Filter changeHandler={handleCountryNameFilter} value={countryFilter} />
      <Countries
        countryList={countriesToShow}
        countryFilter={countryFilter}
        showHandler={handleShowCountryButton}
        weather={weather} />
    </div>
  )
}

export default App