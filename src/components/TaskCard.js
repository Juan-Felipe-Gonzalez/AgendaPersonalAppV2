import { View, Text, TouchableOpacity, Alert } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { PRIORITY, COLORS } from "../utils/constants"
import { deleteTask } from "../storage/TaskStorage"

const TaskCard = (task, onDelete, onEdit) => {

  const priority = PRIORITY[task.priority] || PRIORITY.media

  const handleDelete = ( ) => {
      Alert.alert(
        'Delete task', 
        'are u sure?',
        [
          {text: 'Dimiss', style: 'cancel'},
          {
            text: 'Delete', 
            style: 'destructive', 
            onPress: () => onDelete(task.id)}
        ]
      )
  }

  return (
    <TouchableOpacity>
      <View>
        <Text>{task.title}</Text>
      </View>
      <View>
        <Text>{task.priority}</Text>
      </View>
      <TouchableOpacity onPress={handleDelete} className="p-1">
        <Icon name="trash-can-outline" size={20} color={COLORS.danger}/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default TaskCard