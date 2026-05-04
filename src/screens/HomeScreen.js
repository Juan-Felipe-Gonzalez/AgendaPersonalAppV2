import { useEffect, useState } from 'react';

import EmptyState from '../components/EmptyState';
import TaskCard from '../components/TaskCard';
import { deleteTask, getTasks, initialData } from '../storage/TaskStorage';
import { COLORS } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const handleDelete = async taskId => {
    // return null if error
    const updateTasks = await deleteTask(taskId);
    if (updateTasks) setTasks(updateTasks);
  };

  const handleEdit = task => {
    navigation.navigate('AddEditTask', { task });
  };

  useEffect(() => {
    async function fetchData() {
      await initialData();

      const newTasks = await getTasks();

      setTasks(newTasks);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Reload/rerender homescreen with new tasks
    const unsubscribe = navigation.addListener('focus', async () => {
      const newTasks = await getTasks();
      setTasks(newTasks);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 22, marginLeft: 15}}>My personal planner</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        // ToDo: En que momento sabe handledelete sus parametros?
        renderItem={({ item }) => (
          <TaskCard task={item} onDelete={handleDelete} onEdit={handleEdit} />
        )}
        ListEmptyComponent={<EmptyState />}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddEditTask', { task: null })}
        style={{
          backgroundColor: COLORS.primary,
          shadowOpacity: 0.3,
          shadowRadius: 5,
          shadowColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <FontAwesomeFreeSolid name="plus" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
