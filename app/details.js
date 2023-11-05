import { View, Text, SafeAreaView } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function details() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <>
    
    <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
        >
          <Stack.Screen
        options={{
          title: params.name,
        }}
      />
          <Text>Header</Text>
          <Text>title block on header</Text>
        </View>
      <SafeAreaView>
        {/* body */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Stack.Screen
            options={{
              title: params.name,
            }}
          />
          <Text
            onPress={() => {
              router.setParams({ name: "Updated" });
            }}
          >
            Update the title
          </Text>
        </View>

        <View>
          <Text>Footer block nav</Text>
          <Text></Text>
        </View>
      </SafeAreaView>
    </>
  );
}
