import { Text, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from './../utils/constants';

export default function EmptyState() {
  return (
    <View className="flex-1 justify-center px-8 items-center">
      <Text className="text-xl font-bold text-gray-600 text-center">
        There is not tasks
      </Text>

      <Text className="text-sm font-bold text-gray-400 text-center">
        Click on the button + to add tasks
      </Text>

      <Icon name="calendar-blank-outline" size={100} color={COLORS.border} />
    </View>
  );
}
