import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/constants';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';

// create a storage instance
export const storage = createAsyncStorage('appDB');

export const initialData = async () => {
  const newTask = {
    id: '1234',
    title: 'Tarea demo',
    description: 'Descripción de la tarea demo',
    date: '2026/07/22',
    time: '3:00 am',
    priority: 'Alta',
    createAt: new Date().toISOString(),
  }

  return await addTask(newTask)

  const jsonValue = JSON.stringify(newTask);
  await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  return await AsyncStorage.getItem(STORAGE_KEY)
};

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting the tasks ', error);
    return [];
  }
};

/**
 * function to saveTasks
 * @param {*} tasks
 * @returns boolean
 */
export const saveTasks = async tasks => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving the tasks ', error);
    return false;
  }
};

export const addTask = async task => {
  try {
    // Do I have any task?
    const tasks = await getTasks();
    const updateTasks = [...tasks, task];
    await saveTasks(updateTasks);
    return updateTasks;
  } catch (error) {
    console.error('Error adding the task', error);
    return null;
  }
};

// Todo, función como homework, validar mas adelante
export const updateTask = async taskUpdated => {
  try {
    const tasks = await getTasks();
    const { taskId } = taskUpdated;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskId === taskId) {
        tasks[i] = taskUpdated;
      }
    }

    await saveTasks(tasks);
    return tasks;
  } catch (error) {
    console.error('Error updating the task', error);
    return null;
  }
};

export const deleteTask = async taskId => {
  try {
    const tasks = await getTasks();
    const updateTasks = tasks.filter(item => {
      item.id !== taskId;
    });

    await saveTasks(updateTasks);
    return updateTasks;
  } catch (error) {
    console.error('Error deleting the task', error);
    return null;
  }
};

export const clearAllTasks = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Error deleting all tasks', error);
    return null;
  }
};
