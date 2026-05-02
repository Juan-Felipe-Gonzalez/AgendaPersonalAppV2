import firestore from '@react-native-firebase/firestore';

const taskCollection = firestore().collection('tasks');

export const getTasks = async () => {
  try {
    const snapshot = await taskCollection.orderBy('createdAt', 'desc').get();
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return tasks
  } catch (error) {
    console.error('Error getting tasks from db', error);
    return [];
  }
};

export const addTask = async taskData => {
  try {
    await taskCollection.add({
      ...taskData,
      createdAt: firestore.FieldValue.serverTimestamp(),
      completed: false
    })

    return await getTasks()
  } catch (error) {
    console.error("Error saving the task ", error)
    return null
  }
}

export const deleTask = async (taskIdData) => {
  try {
    await taskCollection.doc(taskIdData).delete()
    return await getTasks()
  } catch (error) {
    console.error("Error deleting the task", error)
  }
}
