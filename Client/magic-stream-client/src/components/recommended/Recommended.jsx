import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {useEffect, useState} from 'react';
import Movies from '../movies/Movies';
import Spinner from '../spinner/Spinner';

const Recommended = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            setLoading(true);
            setMessage("");

            try{
                const response = await axiosPrivate.get('/recommendedmovies');
                // Ensure response.data is an array
                if (Array.isArray(response.data)) {
                    setMovies(response.data);
                    if (response.data.length === 0) {
                        setMessage('No recommended movies available at this time');
                    }
                } else {
                    // Handle unexpected response format
                    setMovies([]);
                    setMessage('Unexpected response format from server');
                }
            } catch (error){
                console.error("Error fetching recommended movies:", error);
                setMovies([]); // Ensure movies stays as an array
                setMessage("Error fetching recommended movies");
            } finally {
                setLoading(false);
            }

        }
        fetchRecommendedMovies();
    }, [])

    return (
        <>
            {loading ? (
                <Spinner/>
            ) :(
                <Movies movies = {movies} message ={message} />
            )}
        </>
    )

}
export default Recommended