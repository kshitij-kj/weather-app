import { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  padding: 20px;
  color: white;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin-bottom: 2rem;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const WeatherCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 500px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(0, 180, 219, 0.5);
    box-shadow: 0 0 20px rgba(0, 180, 219, 0.2);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
`;

const WeatherContent = styled(motion.div)`
  margin-top: 2rem;
`;

const Temperature = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: white;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(0, 180, 219, 0.3);
  line-height: 1;
`;

const City = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
`;

const WeatherDescription = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  text-transform: capitalize;
`;

const WeatherIcon = styled.img`
  width: 120px;
  height: 120px;
  margin: 1rem 0;
  filter: drop-shadow(0 0 10px rgba(0, 180, 219, 0.3));
`;

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const InfoLabel = styled.h3`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.p`
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #00b4db;
  margin: 2rem auto;
`;

const ErrorMessage = styled(motion.p)`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
`;

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError('City not found. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <WeatherContainer>
      <Header>
        <Logo to="/">WeatherApp</Logo>
      </Header>
      
      <MainContent>
        <WeatherCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={fetchWeather}
            />
            <SearchIcon>🔍</SearchIcon>
          </SearchContainer>
          
          {loading && (
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          
          {error && (
            <ErrorMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </ErrorMessage>
          )}
          
          {weather && (
            <WeatherContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <City>{weather.name}, {weather.sys.country}</City>
              <WeatherIcon
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <Temperature>{Math.round(weather.main.temp)}°C</Temperature>
              <WeatherDescription>
                {weather.weather[0].description}
              </WeatherDescription>
              
              <WeatherInfo>
                <InfoItem>
                  <InfoLabel>Humidity</InfoLabel>
                  <InfoValue>{weather.main.humidity}%</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Wind Speed</InfoLabel>
                  <InfoValue>{weather.wind.speed} m/s</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Feels Like</InfoLabel>
                  <InfoValue>{Math.round(weather.main.feels_like)}°C</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Pressure</InfoLabel>
                  <InfoValue>{weather.main.pressure} hPa</InfoValue>
                </InfoItem>
              </WeatherInfo>
            </WeatherContent>
          )}
        </WeatherCard>
      </MainContent>
    </WeatherContainer>
  );
}

export default WeatherApp; 