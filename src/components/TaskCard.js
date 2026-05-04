import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { PRIORITY, COLORS } from '../utils/constants';

const TaskCard = ({ task, onDelete, onEdit }) => {
  const priority = PRIORITY[task.priority] || PRIORITY.medium;

  const handleDelete = () => {
    Alert.alert('Deleting task', 'are u sure?', [
      { text: 'Dimiss', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete(task.id),
      },
    ]);
  };

  return (
    <View
      style={{
        padding: 8,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'gray',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 18,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{task.title}</Text>
        </View>
        <View>
          <Text>{task.priority}</Text>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity onPress={() => onEdit(task)} className="p-1">
          <FontAwesomeFreeSolid name="pencil" size={20} color={COLORS.danger} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} className="p-1">
          <FontAwesomeFreeSolid name="trash" size={20} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;
