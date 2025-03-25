import { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00f260, #0575e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MainContent = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const WeatherCard = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0.5rem 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  padding-right: 2.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 15px rgba(0, 242, 96, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
`;

const WeatherContent = styled(motion.div)`
  margin-top: 1rem;
  text-align: center;
`;

const Temperature = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
  background: linear-gradient(135deg, #00f260, #0575e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Location = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  color: white;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  margin: 0.5rem 0;
  filter: drop-shadow(0 0 8px rgba(0, 180, 219, 0.3));
`;

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
`;

const InfoLabel = styled.h3`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3rem;
`;

const InfoValue = styled.p`
  font-size: 1.2rem;
  color: white;
  font-weight: 600;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #00f260;
  animation: spin 1s linear infinite;
  margin: 1.5rem auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  margin-top: 0.8rem;
  padding: 0.8rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
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
    <Container>
      <Header>
        <Logo>WeatherApp</Logo>
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
            <LoadingSpinner />
          )}
          
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
          
          {weather && (
            <WeatherContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Location>{weather.name}, {weather.sys.country}</Location>
              <WeatherIcon
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <Temperature>{Math.round(weather.main.temp)}°C</Temperature>
              <Description>
                {weather.weather[0].description}
              </Description>
              
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
    </Container>
  );
}

export default WeatherApp; 