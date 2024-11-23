import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPhotos } from '../../redux/slices/gallerySlice';
import Spinner from '../spinner/Spinner';
import PhotoCard from '../photoCard/PhotoCard';
import ErrorPage from '../error/ErrorPage';
import './gallery.css';

export default function Gallery() {
    const dispatch = useDispatch();
    const { photos, status, page, hasMore, error, criticalError } = useSelector(
        (state) => state.gallery
    );

    const [showSpinner, setShowSpinner] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        
        if (initialLoad && !criticalError && hasMore && status !== 'loading') {
            console.log("Fetching photos...");
            setShowSpinner(true);
            const timer = setTimeout(() => {
                setShowSpinner(false);
                dispatch(loadPhotos(page));
                setInitialLoad(false);  
            }, 1500);
    
            return () => clearTimeout(timer);
        } else {
            console.log("Fetch stopped: ", { criticalError, hasMore, status });
        }
    }, [dispatch, page, hasMore, status, criticalError, initialLoad]);

    const handleScroll = () => {
        if (
            !criticalError && 
            window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 500 &&
            !showSpinner &&
            hasMore &&
            status !== 'loading' &&
            !initialLoad  
        ) {
            console.log("Triggered loadPhotos from scroll.");
            dispatch(loadPhotos(page));
        } else {
            console.log("Scroll ignored: ", { criticalError, hasMore, showSpinner, status });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    
    if (criticalError || status === 'failed') {
        return (
            <ErrorPage
                statusCode={error?.includes('Unauthorized') ? 401 : 500}
                message={error}
            />
        );
    }

    return (
        <div className="gallery">
            {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}

            {(status === 'loading' || showSpinner) && <Spinner />}
        </div>
    );
}