import React, { useState } from "react";
import { Button, View, Text, StyleSheet, Touchable } from "react-native";
import {
  Link,
  Stack,
  useNavigation,
  useRouter,
  useLocalSearchParams,
} from "expo-router";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-web";

export default function TodoDetails() {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();  
  const { id, _id, other } = params;
  const idd = id || _id;

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
    getData();
  }, [navigation]);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  function getData() {
    if (!id) return false;
    setLoading(true);
    setErrorMessage("");
    fetch(`${apiUrl}/todos/${idd}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setTodo(res);
        setLoading(false);
        setErrorMessage("");
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Network Error. Please try again.");
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <View style={{ flex: 1, flexDirection: "column" }}>
        {/* <Text>{JSON.stringify(params)}</Text> */}

        <Text style={styles.title}>{todo.task}</Text>
        <Text style={styles.id}>#{todo.id || todo._id}</Text>
        <Text style={styles.text}>{todo.details}</Text>
        <Text style={styles.text}>{todo.status}</Text>
        <TouchableOpacity>
          <Text
            onPress={() => {
              router.push({
                pathname: "/todo",
                params: { post: "random", id, other },
              });
            }}
          >
            Go to TODO
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    borderColor: "#000000",
    borderWidth: 1,
  },
  item: {
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  id: {
    fontSize: 16,
  },
  text: {
    fontSize: 17,
  },
});
