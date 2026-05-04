import { Text, View } from 'react-native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { COLORS } from './../utils/constants';

export default function EmptyState() {
  return (
    <View className="flex-1 justify-center px-8 items-center mt-6">
      <Text className="text-xl font-bold text-gray-600 text-center">
        There isn't tasks
      </Text>

      <Text className="text-sm font-bold text-gray-400 text-center">
        Click on the button <FontAwesomeFreeSolid name="plus" color={COLORS.primary} /> to add tasks
      </Text>
    </View>
  );
}
