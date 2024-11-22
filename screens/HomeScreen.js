import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyListScreen from './MyListScreen';

const Home =()=>{
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'MyList') {
          iconName = 'person';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarShowLabel: false, 
       headerShown: false // Hides the tab label
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="MyList" component={MyListScreen} />
  </Tab.Navigator>
  )
}
const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [filterType, setFilterType] = useState('All');

  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.rapidmock.com/api/vikuman/v1/movies/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log to inspect the structure
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchMovies();
  }, []);
  
  

  
  

 

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie => 
        movie.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  const sortAlphabetically = () => {
    const sortedMovies = [...filteredMovies].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredMovies(sortedMovies);
    setIsSorted(true);
  };

  const filterByType = (type) => {
    setFilterType(type);
    if (type === 'All') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie => movie.type === type);
      setFilteredMovies(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={30} onPress={() => alert('Hamburger Menu clicked')} />
          <Text>Cinemas</Text>
        <Ionicons name="person-circle" size={30} onPress={() => navigation.navigate('Profile', { message: 'Profile Screen Placeholder' })} />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Movies or Shows"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.buttonContainer}>
        <Button title="Sort A-Z" onPress={sortAlphabetically} />
        <Button title="All" onPress={() => filterByType('All')} />
        <Button title="Movies" onPress={() => filterByType('Movie')} />
        <Button title="Shows" onPress={() => filterByType('Show')} />
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })}>
            <View style={styles.movieItem}>
              <Image source={{ uri: item.poster }} style={styles.poster} />
              <Text style={styles.movieName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.myListButton} onPress={() => navigation.navigate('MyListScreen')}>
        <Text style={styles.myListButtonText}>Go to My List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  movieName: {
    fontSize: 16,
  },
  myListButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    alignItems: 'center',
  },
  myListButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
