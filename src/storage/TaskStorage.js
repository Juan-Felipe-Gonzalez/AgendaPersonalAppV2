import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/constants';

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log('Error getting the tasks ', error);
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
    console.log('Error saving the tasks ', error);
    return false;
  }
};

export const addTask = async task => {
  try {
    // Do I have any task?
    const tasks = await getTasks();
    const updateTasks = [...tasks, task];
    await saveTasks(tasks);
    return updateTasks;
  } catch (error) {
    console.log('Error adding the task', error);
    return null;
  }
};

// Todo, función como homework, validar mas adelante
export const updateTask = async taskUpdated => {
  try {
    const tasks = await getTasks();
    const { taskId } = taskUpdated

    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].taskId === taskId) {
        tasks[i] = taskUpdated
      }
    }

    await saveTasks(tasks);
    return tasks;
  } catch (error) {
    console.log('Error updating the task', error);
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
    console.log('Error deleting the task', error);
    return null;
  }
};

export const clearAllTasks = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.log('Error deleting all tasks', error);
    return null;
  }
};
