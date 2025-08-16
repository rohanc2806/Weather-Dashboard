# 🌤️ Modern Weather Dashboard

A stunning, modern weather dashboard built with React, featuring glassmorphism design, smooth animations, and real-time weather data from OpenWeatherMap API.

![Weather Dashboard](https://via.placeholder.com/800x400/0c0c0c/64ffda?text=Weather+Dashboard+Preview)

## ✨ Features

- **🎨 Glassmorphism Design**: Beautiful frosted glass effect with backdrop filters
- **🌙 Dark Theme**: Elegant dark gradient background with neon accents  
- **🎭 Smooth Animations**: Framer Motion powered entrance and hover animations
- **📱 Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **🌍 Real Weather Data**: Integration with OpenWeatherMap API
- **🔍 City Search**: Search for weather in any city worldwide
- **📊 Detailed Metrics**: Temperature, humidity, wind speed, visibility, and pressure
- **📅 5-Day Forecast**: Extended weather forecast with daily highs and lows
- **⚡ Modern React**: Built with hooks, functional components, and best practices
- **♿ Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone or create the project:**
   ```bash
   npx create-react-app weather-dashboard
   cd weather-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install framer-motion
   ```

3. **Replace the default files with the provided code files**

4. **Get your API key:**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

5. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

6. **Add your API key to `.env`:**
   ```env
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

7. **Start the development server:**
   ```bash
   npm start
   ```

8. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SearchComponent.js
│   │   ├── SearchComponent.css
│   │   ├── CurrentWeather.js
│   │   ├── CurrentWeather.css
│   │   ├── WeatherDetails.js
│   │   ├── WeatherDetails.css
│   │   ├── ForecastComponent.js
│   │   ├── ForecastComponent.css
│   │   ├── LoadingSpinner.js
│   │   └── LoadingSpinner.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env
├── .env.example
├── package.json
└── README.md
```

## 🎨 Design Features

### Glassmorphism Effect
The app uses modern glassmorphism design principles:
- `backdrop-filter: blur(20px)` for frosted glass effect
- Semi-transparent backgrounds with `rgba(255, 255, 255, 0.1)`
- Subtle borders with `rgba(255, 255, 255, 0.2)`
- Box shadows with `rgba(0, 0, 0, 0.3)`

### Color Scheme
- **Primary Background**: Dark gradient from `#0c0c0c` to `#16213e`
- **Accent Colors**: Cyan (`#64ffda`) and Purple (`#bb86fc`)
- **Text Colors**: High contrast white with varying opacity
- **Glass Cards**: Semi-transparent with blur effects

### Animations
- **Entrance Animations**: Staggered fade-in with slide effects
- **Hover Effects**: Scale, glow, and elevation changes
- **Loading States**: Smooth spinning and pulsing animations
- **Background**: Floating particles with gentle movement

## 🔧 Customization

### Changing Colors
Edit the CSS custom properties in `App.css`:
```css
:root {
  --accent-blue: #64ffda;  /* Change accent color */
  --accent-purple: #bb86fc; /* Change secondary accent */
  --glass-bg: rgba(255, 255, 255, 0.1); /* Glass transparency */
}
```

### Adding New Weather Details
In `WeatherDetails.js`, add new items to the `details` array:
```javascript
{
  icon: '🌡️',
  label: 'UV Index',
  value: `${data.uvi || 'N/A'}`,
  color: '#FF9800'
}
```

### Modifying Animations
Adjust Framer Motion animations in any component:
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

## 🌐 API Integration

### OpenWeatherMap Setup
1. Create account at [openweathermap.org](https://openweathermap.org/)
2. Go to API Keys section
3. Generate a free API key
4. Add to your `.env` file

### API Endpoints Used
- **Current Weather**: `/data/2.5/weather`
- **5-Day Forecast**: `/data/2.5/forecast`

### Rate Limits
- Free tier: 1,000 calls/day
- 60 calls/minute maximum

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px (partial grid)
- **Desktop**: > 1024px (full grid layout)

## ⚡ Performance

- **Bundle Size**: Optimized with tree shaking
- **Loading**: Skeleton screens and smooth transitions  
- **Caching**: API responses cached for 10 minutes
- **Images**: Optimized weather icons and lazy loading

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repo to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from native emoji set
- Glassmorphism inspiration from modern UI trends
- Animation library: [Framer Motion](https://www.framer.com/motion/)

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working:**
- Make sure your API key is active (can take up to 10 minutes)
- Check that `.env` file is in the root directory
- Verify the environment variable name: `REACT_APP_WEATHER_API_KEY`

**Styles Not Loading:**
- Ensure all CSS files are imported in their respective JS components
- Check for typos in CSS class names
- Clear browser cache and restart development server

**Build Errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for any missing dependencies

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, some glassmorphism effects may not be supported.

---

Made with ❤️ and lots of ☕ by Rohan Chadha
