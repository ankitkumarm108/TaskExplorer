import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const FILTERS = ['All', 'Completed', 'Incomplete'];

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTasks(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error fetching tasks.</Text>
          <Button title="Retry" onPress={fetchTasks} />
        </View>
      ) : (
        <>
          <View style={styles.filterRow}>
            {FILTERS.map(f => (
              <View style={styles.btnView} key={f}>
                <Button title={f} onPress={() => setFilter(f)} color={filter === f ? 'blue' : 'gray'} />
              </View>
            ))}
          </View>

          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.taskItem} onPress={() => navigation.navigate('Details', { task: item })}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text>{item.completed ? '✓ Completed' : '✗ Incomplete'}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10,paddingTop:10, backgroundColor: 'white' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filterRow: { flexDirection: 'row', marginBottom: 10 },
  taskItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  taskTitle: { fontWeight: 'bold' },
  btnView: { paddingRight: 20 },
  errorText: { marginBottom: 10, color: 'red' },
});
