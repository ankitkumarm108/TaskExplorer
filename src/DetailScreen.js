import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function DetailScreen({ route }) {
  const { task: initialTask, updateTask } = route.params;
  const [task, setTask] = useState(initialTask);

  const toggleCompleted = () => {
    const updatedTask = { ...task, completed: !task.completed };
    setTask(updatedTask);
    if (typeof updateTask === 'function') {
      updateTask(updatedTask);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={styles.title}>{task.title}</Text>
      <Text>User ID: {task.userId}</Text>
      <Text>Status: {task.completed ? '✓ Completed' : '✗ Incomplete'}</Text>
      <View style={styles.button}>
        <Button title="Toggle Status" onPress={toggleCompleted} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  button: { marginTop: 20 }
});
