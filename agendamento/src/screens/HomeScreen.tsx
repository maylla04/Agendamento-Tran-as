import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList>

export default function HomeScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}