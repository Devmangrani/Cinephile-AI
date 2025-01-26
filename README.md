# 🎬 Cinephile AI - Where AI Meets Movie Magic

> **Why Cinephile AI?** Born from a deep love for cinema, Cinephile AI is more than just a movie platform – it's a celebration of the art of filmmaking. A "cinephile" is someone whose heart beats for cinema, who sees movies not just as entertainment, but as an art form that touches the soul. We've combined this passionate appreciation with cutting-edge AI to create something magical. Just as a true cinephile can spend hours discussing the beauty of cinematography, the depth of storytelling, and the power of performances, our AI companion shares this boundless enthusiasm for film. It understands the emotional resonance of movies, can engage in meaningful conversations about cinema, and helps you discover films that will capture your heart. Cinephile AI is where technology meets movie magic, creating a unique experience for everyone who believes in the transformative power of cinema.

<div align="center">
  <img src="src/assets/cinephile-logo.png" alt="Cinephile Logo" width="200"/>
  <p><em>Your Personal AI-Powered Movie Companion</em></p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19"/>
  <img src="https://img.shields.io/badge/Firebase-Auth-orange?style=for-the-badge&logo=firebase" alt="Firebase Auth"/>
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Google-Gemini-green?style=for-the-badge&logo=google" alt="Google Gemini"/>
</div>

---

## ❤️ Our Love Story with Movies

Cinephile AI was created by movie lovers, for movie lovers. We believe that every film has a story to tell, not just on the screen, but in the hearts of those who watch it. Our AI doesn't just process movie data – it understands the passion that makes cinema special. Whether you're a casual viewer or a dedicated film buff, Cinephile AI is your companion in exploring the vast, beautiful world of cinema.

## 🌟 Key Features

### 🤖 AI-Powered Movie Discovery
- **Smart Recommendations**
  - Natural language movie search powered by Google Gemini AI
  - Contextual understanding of user preferences
  - Multi-language support for global accessibility
  - Dynamic movie suggestions based on user queries

### 🎥 Interactive Movie Experience
- **Rich Movie Information**
  - Instant trailer playback for quick previews
  - Detailed movie overviews and descriptions
  - Beautiful movie cards with hover effects
  - Smooth horizontal scrolling movie lists

### 🎯 Personalized Categories
- **Curated Collections**
  - Now Playing Movies
  - Popular Movies Section
  - Trending Movies Feed
  - Upcoming Releases
  - AI-Generated Custom Categories

### 🎨 Modern User Interface
- **Sleek Design**
  - Responsive layout for all devices
  - Netflix-inspired UI/UX
  - Smooth animations and transitions
  - Custom purple theme with modern aesthetics
  - Dynamic content loading with loading states
  - Responsive and user-friendly design
  
### 🔐 Secure Authentication
- **User Management**
  - Email/Password authentication
  - User profile customization
  - Protected routes
  - Persistent login state

## 🚀 Latest Updates

- **Enhanced Movie Discovery**
  - Instant trailer viewing on movie card click
  - Floating back button for better navigation
  - Improved scrolling performance
  - Smart movie overview expansion
## 🚀 Getting Started

### Prerequisites
1. **TMDB API Key**
   - Visit [TMDB Website](https://www.themoviedb.org/)
   - Create an account or sign in
   - Go to Settings > API
   - Register for a new API key (choose "Developer" option)
   - Copy your API key (v3 auth)

2. **Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Get API Key"
   - Create a new API key
   - Enable the Gemini API in your Google Cloud Console
   - Copy your API key

### Installation Steps
1. Clone the repository
```bash
git clone https://github.com/Devmangrani/Cinephile-ai.git
cd Cinephile-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` file with your API keys:
```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server
```bash
npm start
```

## 💡 How It Works

1. **Login/Signup**: Create your account or login securely
2. **Browse Movies**: Explore curated movie collections
3. **AI Search**: Use natural language to find movies
   - Example: "Show me sci-fi movies with time travel"
   - AI understands context and preferences
4. **Quick Preview**: Click any movie to watch its trailer
5. **Make Decision**: Use trailers and info to choose your next watch

## 🛠️ Technical Stack

- ⚛️ **Frontend**
  - React 19 with Hooks
  - Redux Toolkit for state management
  - React Router v7
  - Tailwind CSS for styling

- 🧠 **AI Integration**
  - Google Gemini API
  - Natural Language Processing
  - Context-aware recommendations

- 🔥 **Backend & Auth**
  - Firebase Authentication
  - Secure user management
  - Protected routes

## 🌐 Multi-Language Support
- English
- Hindi
- Japanese
- More languages coming soon!

## 🔜 Upcoming Features
- Personalized watchlists
- AI-powered movie ratings
- Social sharing integration
- Advanced filtering options
- User reviews and ratings

## 🤝 Contributing
We welcome contributions! Here's how you can help:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🌟 Live Demo
Check out the live demo: [Cinephile AI](https://cinephile-ai.web.app)

## 📝 License
This project is open source and available under the MIT License.

---

<div align="center">
  <p>Built with ❤️ by Dev Mangrani for movie lovers</p>
  <p>Powered by React, Firebase, TMDB, and Google Gemini AI</p>
</div>
