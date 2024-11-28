import React, { useState, useEffect, useRef } from 'react';
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


    const [initialLoad, setInitialLoad] = useState(true);
    const observerRef = useRef(null)

    useEffect(() => {

        if (initialLoad && !criticalError && hasMore && status !== 'loading') {
            dispatch(loadPhotos(page))
            setInitialLoad(false)
        }

    }, [dispatch, page, hasMore, status, criticalError, initialLoad]);

    const handleObserver = (entries) => {
        const [entry] = entries

        if (entry.isIntersecting && !initialLoad && hasMore && status !== 'loading') {
            dispatch(loadPhotos(page))
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        })

        if (observerRef.current) {
            observer.observe(observerRef.current)
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current)
            }
        }
    }, [photos, hasMore, status]);


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
            {photos.map((photo, index) => {
                const isLastPhoto = index === photos.length - 1
                return (
                    <PhotoCard key={photo.id} photo={photo} ref={isLastPhoto ? observerRef : null} />
                )
            })}

            {status === 'loading' && <Spinner />}
        </div>
    );
}