import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import 'reflect-metadata';
import {container} from './container';
import {IStory, IHackerNewsService} from './interfaces';

export default function App() {
  const [stories, setStories] = useState<IStory[]>([]);
  const hackerNewsService =
    container.get<IHackerNewsService>('IHackerNewsService');

  useEffect(() => {
    loadTopStories();
  }, []);

  async function loadTopStories() {
    const topStories = await hackerNewsService.getTopStories();
    setStories(topStories);
  }

  function handlePressUrl(url: string) {
    Linking.openURL(url);
  }

  function renderStory({item}: {item: IStory}) {
    return (
      <TouchableOpacity onPress={() => handlePressUrl(item.url)}>
        <View style={styles.story}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.url}>{item.url}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hacker News Top Stories List</Text>
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={item => item.id.toString()}
        refreshing={stories.length === 0}
        onRefresh={loadTopStories}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  story: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  url: {
    fontSize: 14,
    color: '#888',
  },
});
