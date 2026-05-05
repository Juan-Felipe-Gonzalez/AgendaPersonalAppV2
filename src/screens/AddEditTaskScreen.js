import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './../utils/constants';
import { updateTask } from './../storage/TaskStorage';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { Select } from 're-native-ui';
import { addTask } from './../storage/TaskStorage';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';

const generateId = () => {
  return Date.now().toString(36) + Math.random.toString(36).substring(2, 9);
};

export default function AddEditTaskScreen({ navigation, route }) {
  const existingTask = route.params?.task;
  const isEditing = !!existingTask; // its like === but !!
  const defaultStyles = useDefaultStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState();
  const [priority, setPriority] = useState('');

  const options = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || '');
      setDescription(existingTask.description || '');
      setDate(existingTask.date || '');
      setTime(existingTask.time || '');
      setPriority(existingTask.priority || '');
    }
  }, [existingTask]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? 'Edit task' : 'New task',
    });
  }, [navigation, isEditing]);

  const validateEmptyFields = () => {
    // ToDo
    // if (!title.trim()) {
    //   Alert.alert('Error', 'Title is required');
    //   return;
    // }
  };

  const handleSave = async () => {
    validateEmptyFields();

    if (isEditing) {
      const updatedTask = {
        id: route.params.task.id,
        title: title.trim(),
        description: description.trim(),
        date: date,
        time: time.trim(),
        priority: priority.trim(),
        createAt: route.params.task.createAt,
      };

      const result = await updateTask(updatedTask);

      if (result) navigation.goBack();
      else Alert.alert('Error', 'Couldnt updated the task');
    } else {
      const newTask = {
        id: generateId(),
        title: title.trim() || 'Default title',
        description: description.trim() || 'Default description',
        date: date || '2026-12-24',
        time: time.trim() || '8:00 AM',
        priority: priority.trim() || 'LOW',
        createAt: new Date().toISOString(),
      };

      const result = await addTask(newTask);

      if (result) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'The task couldnt be created');
      }
    }
  };

  return (
    <SafeAreaView
      className="flex-1 "
      style={{ backgroundColor: COLORS.background }}
    >
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View >
          <View style={styles.container}>
            <Text style={styles.titles}>Task Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Add the task title"
              maxLength={100}
              className="text-base px-3 py-4 bg-white"
              style={{
                borderColor: COLORS.border,
              }}
              autoCapitalize='sentences'
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.titles}>Description</Text>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              placeholder="Task description"
              value={description}
              onChangeText={setDescription}
              autoCapitalize='sentences'
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.titles}>Date & Time</Text>
            <DateTimePicker
              mode="single"
              date={date}
              onChange={({ date }) => setDate(date)}
              styles={defaultStyles}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.titles}>Priority</Text>
            <Select
              label="Choose an option"
              placeholder="Select an option"
              value={priority}
              onChange={setPriority}
              options={options}
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
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
            <FontAwesomeFreeSolid name="floppy-disk" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10
  },
  titles: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8, 
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderStyle: "solid"
  }
})
