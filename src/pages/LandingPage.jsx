import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  color: white;
  overflow: hidden;
  position: relative;
`;

const BackgroundAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
`;

const WeatherParticles = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const HeroSection = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 2rem;
  max-width: 700px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #00b4db, #0083b0)' : 
    'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.primary ? 
    '0 4px 15px rgba(0, 180, 219, 0.3)' : 
    '0 4px 15px rgba(255, 255, 255, 0.1)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? 
      '0 6px 20px rgba(0, 180, 219, 0.4)' : 
      '0 6px 20px rgba(255, 255, 255, 0.2)'};
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border: 1px solid rgba(0, 180, 219, 0.3);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #00b4db;
  text-shadow: 0 0 20px rgba(0, 180, 219, 0.5);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #888;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: flex;
  gap: 4rem;
  margin: 4rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.h4`
  font-size: 2.5rem;
  color: #00b4db;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #888;
  font-size: 1rem;
`;

function LandingPage() {
  return (
    <Container>
      <BackgroundAnimation
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <Content>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Personal Weather
            <br />
            Assistant Made Beautiful
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience weather forecasting like never before with our stunning interface.
            Get real-time updates, detailed forecasts, and beautiful visualizations for any location worldwide.
          </Subtitle>
          
          <ButtonGroup>
            <StyledLink to="/weather">
              <Button
                primary
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Try it Now ✨
              </Button>
            </StyledLink>
          </ButtonGroup>

          <Stats>
            <StatItem>
              <StatNumber>200K+</StatNumber>
              <StatLabel>Active Users</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>190+</StatNumber>
              <StatLabel>Countries Covered</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>99.9%</StatNumber>
              <StatLabel>Accuracy Rate</StatLabel>
            </StatItem>
          </Stats>
        </HeroSection>

        <Features>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FeatureIcon>🌡️</FeatureIcon>
            <FeatureTitle>Real-Time Updates</FeatureTitle>
            <FeatureDescription>
              Get instant access to live weather data with precise measurements and hourly forecasts.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Cross-Platform</FeatureTitle>
            <FeatureDescription>
              Access your weather information seamlessly across all your devices with our responsive design.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <FeatureIcon>🎨</FeatureIcon>
            <FeatureTitle>Beautiful Visuals</FeatureTitle>
            <FeatureDescription>
              Experience weather data through stunning animations and intuitive visualizations.
            </FeatureDescription>
          </FeatureCard>
        </Features>
      </Content>
    </Container>
  );
}

export default LandingPage; 