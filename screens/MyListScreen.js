import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';

const MyListScreen = () => {
  const [toWatchList, setToWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchMyList();
    }, [])
  );

  const fetchMyList = async () => {
    try {
      const response = await axios.get('https://api.rapidmock.com/api/vikuman/v1/mylist');
      const { toWatch, watched } = response.data;
      setToWatchList(toWatch);
      setWatchedList(watched);
    } catch (error) {
      console.error("Error fetching my list:", error);
    }
  };

  const renderMovieCard = (item) => (
    <MovieCard movie={item} onPress={() => { /* Handle movie card press */ }} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To Watch</Text>
      <FlatList
        data={toWatchList}
        renderItem={({ item }) => renderMovieCard(item)}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={styles.header}>Watched</Text>
      <FlatList
        data={watchedList}
        renderItem={({ item }) => renderMovieCard(item)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});


// Continue with the MyListScreen component code
export default MyListScreen;