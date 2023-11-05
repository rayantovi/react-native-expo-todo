import { Button, View, Text } from "react-native";

import { useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";


export default function settings() {
  const navigation = useNavigation();

  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go to first screen" onPress={handlePopToTop} />
    </View>
  );
}
