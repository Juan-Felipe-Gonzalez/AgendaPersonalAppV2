import { useEffect, useState } from 'react';

import EmptyState from '../components/EmptyState';
import TaskCard from '../components/TaskCard';
import { deleteTask, getTasks } from '../storage/TaskStorage';
import { COLORS } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';

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

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>My personal planner</Text>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={item => (
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
          }}
        >
          <Icon name="plus" size={30} color={'white'} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
