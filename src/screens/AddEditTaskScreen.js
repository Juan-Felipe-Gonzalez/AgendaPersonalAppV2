import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('');

  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState();
  const [selectedValue, setSelectedValue] = useState('');

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

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    if (isEditing) {
      const result = await updateTask();

      if (result) navigation.goBack();
      else Alert.alert('Error', 'Couldnt updated the task');
    } else {
      const newTask = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        date: date.trim(),
        time: time.trim(),
        priority: priority.trim(),
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
        <View>
          <View>
            <Text>Task Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Add the task title"
              maxLength={100}
              className="text-base px-3 py-4 bg-white"
              style={{
                color: COLORS.primary,
                borderColor: COLORS.border,
              }}
            />
          </View>

          <View>
            <Text>Description</Text>
            <TextInput editable multiline numberOfLines={4} maxLength={40} />
          </View>

          <View>
            <Text>Date & Time</Text>
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              styles={defaultStyles}
            />
          </View>

          <View>
            <Text>Priority</Text>
            <Select
              label="Choose an option"
              placeholder="Select an option"
              value={selectedValue}
              onChange={setSelectedValue}
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
            <FontAwesomeFreeSolid name="floppy-disk" size={30} color="white" />;
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
