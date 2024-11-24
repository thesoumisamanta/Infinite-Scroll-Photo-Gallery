# Responsive Photo Gallery Application

This is a responsive photo gallery application built with **React (Vite)** that fetches images dynamically from the **Unsplash API**. The app includes infinite scrolling, a mobile-friendly grid layout, and error handling for a seamless user experience.  

## Features

- **Dynamic Image Fetching**: Fetches photos from the Unsplash API.  
- **Infinite Scrolling**: Automatically loads more photos as the user scrolls.  
- **Responsive Design**: Adapts to different screen sizes:  
  - 1-2 columns on small screens.  
  - 3-4 columns on larger screens.  
- **Error Handling**: Displays error messages for failed API requests.  
- **Loading Indicator**: Shows a spinner or "Loading..." text while fetching images. 

### Bonus Features 

- **Hover Effects**: Adds subtle hover animations for a better user experience.  
- **Accessibility**: Includes alt tags for images and ARIA roles for improved accessibility.  
- **Performance Optimization**:  
  - Lazy-loaded images for better performance on slow connections.  
  - Local caching to minimize redundant API calls. 



## Technologies Used  
- **React (Vite)** for efficient front-end development.  
- **React Router** for navigation.  
- **Redux** for state management.  
- **Axios** for API integration.  
- **MUI** for specific UI components.  
- **CSS/SCSS** for custom styling. 


## Prerequisites  
- Node.js (v16 or higher).  
- Unsplash API Key (register at [Unsplash Developer](https://unsplash.com/developers) to obtain your API key).  


## Installation and Setup  

### 1. Clone the Repository  
```bash  
git clone https://github.com/your-username/photo-gallery-app.git  
cd photo-gallery-app  
```

### 2. Install Dependencies
```bash
npm install 
``` 

### 3. Set Environment Variables
```bash
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
``` 

### 4. Run the App
```bash
npm run dev  
```

### 5. Access the Application
Open your browser and navigate to http://localhost:5173.


Github Repository
https://github.com/thesoumisamanta/Infinite-Scroll-Photo-Gallery

