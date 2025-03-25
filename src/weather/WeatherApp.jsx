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
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  color: white;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00f260, #0575e6);
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
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 1rem;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem 0;
  position: relative;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  padding-left: 3rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 20px rgba(0, 242, 96, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    padding-left: 2.5rem;
    font-size: 1rem;
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

const Temperature = styled.div`
  font-size: 4rem;
  font-weight: 700;
  margin: 1rem 0;
  background: linear-gradient(135deg, #00f260, #0575e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Location = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const WeatherIcon = styled.img`
  width: 120px;
  height: 120px;
  margin: 1rem 0;
  filter: drop-shadow(0 0 10px rgba(0, 180, 219, 0.3));
`;

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InfoItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
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

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #00f260;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 10px;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem;
  }
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