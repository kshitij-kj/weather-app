# Weather App

A beautiful and responsive weather application built with React, featuring real-time weather data from OpenWeatherMap API.

## Features

- Real-time weather data for any city worldwide
- Beautiful and modern UI with smooth animations
- Responsive design that works on all devices
- Detailed weather information including temperature, humidity, wind speed, and more
- Weather icons and descriptions
- Clean and intuitive user interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key

## Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Replace `your_api_key_here` with your OpenWeatherMap API key in `.env`

4. Start the development server:
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in Vercel:
   - Go to Project Settings > Environment Variables
   - Add `VITE_WEATHER_API_KEY` with your OpenWeatherMap API key
4. Deploy your application

### Environment Variables

The following environment variables are required:

- `VITE_WEATHER_API_KEY`: Your OpenWeatherMap API key

## Usage

1. Enter a city name in the search input
2. Press Enter to fetch weather data
3. View the current weather conditions and additional information

## Technologies Used

- React
- Vite
- Axios
- Framer Motion
- Emotion (Styled Components)
- OpenWeatherMap API

## License

MIT 