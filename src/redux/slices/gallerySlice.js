import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchPhotos} from '../../api/unsplashApi'

export const loadPhotos = createAsyncThunk('gallery/loadPhotos', async (page, {rejectWithValue}) => {
    try {
        return await fetchPhotos(page)
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialState = {
    photos: [],
    photoIds: [],
    page: 1,
    status: 'idle',
    error: null,
    hasMore: true,
    criticalError: false, 
};

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        resetState: (state) => {
            state.photos = [];
            state.photoIds = [];
            state.page = 1;
            state.status = 'idle';
            state.error = null;
            state.hasMore = true;
            state.criticalError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPhotos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded';

                const uniquePhotos = action.payload.filter(
                    (photo) => !state.photoIds.includes(photo.id)
                );

                uniquePhotos.forEach((photo) => {
                    state.photoIds.push(photo.id);
                    state.photos.push(photo);
                });

                state.hasMore = action.payload.length > 0;
                if (state.hasMore) {
                    state.page += 1;
                }
            })
            .addCase(loadPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            
                if (action.payload?.includes('Unauthorized')) {
                    console.log("Unauthorized error occurred, setting criticalError to true.");
                    state.criticalError = true; 
                    state.hasMore = false; 
                }
            });
            
    },
});

export const { resetState } = gallerySlice.actions; 
export default gallerySlice.reducer;
