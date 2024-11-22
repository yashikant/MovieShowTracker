import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have this library installed

const MovieDetailsScreen = ({ route, navigation }) => {
  const [movieId, setMovieId] = useState(undefined);
  const [movie, setMovie] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    console.log("Movie ID from route:", route.params.movieId);
    setMovieId(route.params.movieId);
  }, [])

  useEffect(() => {
    if (!movieId) {
      return;
    }
    console.log("Fetching details for movie ID:", movieId);
    fetchMovieDetails();

    // Load stored status for consistency
    // const storedStatus = localStorage.getItem(`movieStatus_${movieId}`);
    // if (storedStatus) {
    //   setSelectedStatus(storedStatus);
    // }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api.rapidmock.com/api/vikuman/v1/movies?id=${movieId}`);
      console.log("Movie details fetched:", response.data);

      setMovie(response.data);

      const myList = await (await axios.get("https://api.rapidmock.com/api/vikuman/v1/mylist")).data
      const toWatch = myList["To Watch"];
      const watched = myList["Watched"];
      // console.log("To Watch:", toWatch);
      // console.log("Watched:", watched);
      const movieStatus = toWatch.find((movie) => movie.id === movieId) ? "To Watch" : watched.find((movie) => movie.id === movieId) ? "Watched" : null;
      setSelectedStatus(movieStatus);
      console.log("Current movie status:", movieStatus);
      // myList.data.forEach((movie) => {
      //   if (movie.id === movieId) {
      //     setSelectedStatus(movie.status);
      //   }
      // })
      // // Fetch the movie status from your watchlist API if available
      // const statusResponse = await axios.get(`https://api.rapidmock.com/api/vikuman/v1/mylist/status?movieId=${movieId}`);
      // console.log("Current movie status:", statusResponse.data);
      // if (statusResponse.data.status) {
      //   setSelectedStatus(statusResponse.data.status);
      // }
    } catch (error) {
      console.error("Error fetching movie details or status:", error);
    }
  };


  const updateWatchList = async (status) => {
    try {
      const response = await axios.post('https://api.rapidmock.com/api/vikuman/v1/mylist/add', {
        movieId: movie.id,
        status,
      });
      console.log("Updated watch list:", response.data);
      setSelectedStatus(status);

      // Save status to local storage for consistency
      localStorage.setItem(`movieStatus_${movie.id}`, status);

      // if (refreshMyList) {
      //   refreshMyList();
      // }
    } catch (error) {
      console.error("Error updating watch list:", error);
    }
  };

  const toggleStatus = (status) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.description}>{movie.description}</Text>
      <View style={styles.buttonContainer}>
        {['To Watch', 'Watched'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusButton,
              selectedStatus === status && styles.activeButton
            ]}
            onPress={() => {
              toggleStatus(status);
              updateWatchList(status);
            }}
          >
            <Text style={styles.buttonText}>{status}</Text>
            {selectedStatus === status && <Icon name="check" size={16} color="#fff" style={styles.icon} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#007bff',
  },
  icon: {
    marginLeft: 8,
  },
});

export default MovieDetailsScreen;