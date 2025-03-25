import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WeatherApp from './weather/WeatherApp';
import styled from 'styled-components';

const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: auto;
    margin-top: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00f260, #0575e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #00f260, #0575e6);
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: ${props => props.primary ? '1' : '0'};
  }

  &:hover:before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const FeaturesSection = styled.div`
  padding: 6rem 2rem;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(30, 41, 59, 0.5);
  padding: 2rem;
  border-radius: 15px;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #00f260;
    margin-bottom: 0.5rem;
  }

  p {
    color: #94a3b8;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 2rem;
    }
  }
`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default App; 