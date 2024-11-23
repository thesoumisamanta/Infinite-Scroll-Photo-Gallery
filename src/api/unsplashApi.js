import axios from 'axios';

export const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    }
})

export const fetchPhotos = async (page) => {
    try {
        const response = await unsplashApi.get(`/photos?page=${page}&per_page=15`);

        const lanscapePhotos = response.data.filter((photo) => {
            const aspectRatio = photo.width / photo.height;
            return aspectRatio >= 1 && aspectRatio <= 2;
        });

        return lanscapePhotos;
    } catch (error) {
        if (error.response) {
            
            throw new Error(error.response.data?.message || `Error: ${error.response.status}`);
        } else if (error.request) {
            
            throw new Error('Network error. Please check your internet connection.');
        } else {
            
            throw new Error('An unexpected error occurred.');
        }
    }
};
