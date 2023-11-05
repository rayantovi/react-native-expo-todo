import React, { useState } from "react";
import {
  Button,
  CheckBox,
  View,
  Text,
  StyleSheet,
  Touchable,
} from "react-native";
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
import { TextInput } from "react-native-gesture-handler";

export default function TodoUpdate() {
  // const [todo, setTodo] = useState({});
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");
  const [isSelected, setSelection] = useState(false);

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
    if (! idd) return false;
    setLoading(true);
    setErrorMessage("");
    fetch(`${apiUrl}/todos/${idd}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setTask(res.task || '');
        setTask(res.details || '');
        setSelection(res.status == true ? true : false);
        setLoading(false);
        setErrorMessage("");
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Network Error. Please try again.");
      });
  }

  function reset() {
    setLoading(false);
    setErrorMessage("");
    setSelection(false);
    setTask("");
    setDetails("");
  }
  function cancel() {
    reset();
    router.push("/todo");
  }
  function updateTodo() {
    if (!task || !idd) return false;
    setLoading(true);
    setErrorMessage("");
    fetch(`${apiUrl}/todos/${idd}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        details: details,
        status: isSelected == true ? "Complete" : "In-Complete",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setErrorMessage("");
        cancel(); //go back to list view
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Network Error. Please try again.");
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
        <Text style={styles.title}>Add New Todo</Text>

        <TextInput
          style={{ height: 40 }}
          placeholder="Task ..."
          onChangeText={(newTask) => setTask(newTask)}
          defaultValue={task}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Details ..."
          onChangeText={(newDetails) => setDetails(newDetails)}
          defaultValue={details}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Complete?</Text>
        </View>

        {loading ? (
          <Text style={styles.message}>Please Wait...</Text>
        ) : errorMessage ? (
          <Text style={styles.message}>{errorMessage}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => updateTodo()}
            style={{ ...styles.button, marginVertical: 0 }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => cancel()}
            style={{
              ...styles.button,
              marginVertical: 0,
              marginLeft: 10,
              backgroundColor: "tomato",
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.3)",
    marginBottom: 15,
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: "flex-start",
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  message: {
    color: "tomato",
    fontSize: 17,
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
