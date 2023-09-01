import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [wordList, setWordList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch words from API
    axios
      .get('https://api.datamuse.com/words?sp=y*&max=100')
      .then(response => {
        setWordList(response.data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text style={styles.wordText}>{item.word}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.appName}>WordEX</Text>
      {error ? (
        <Text style={styles.errorText}>An error occurred: {error}</Text>
      ) : (
        <FlatList
          data={wordList}
          renderItem={renderItem}
          keyExtractor={(item) => item.word}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#78d',
  },
  wordItem: {
    padding: 16,
    marginBottom: 8,
    marginLeft:1,
    marginTop:20,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center', 
  },
  wordText: {
    fontSize: 18,
    color: '#d9d',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 32,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
