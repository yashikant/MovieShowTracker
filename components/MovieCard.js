import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MovieCard = ({ movie, onPress, gridLayout }) => {
  return (
    <TouchableOpacity onPress={onPress} style={gridLayout ? styles.gridCard : styles.listCard}>
      <Image source={{ uri: movie.poster_url }} style={gridLayout ? styles.gridImage : styles.listImage} />
      <Text style={styles.title}>{movie.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  listCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  gridImage: {
    width: '100%',
    height: 150,
  },
  listImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
});

export default MovieCard;