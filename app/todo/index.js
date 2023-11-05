import React, { useState } from "react";
import { FlatList, Button, View, Text, StyleSheet } from "react-native";
import { Link, Stack, useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";

//dummy data
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    task: "First Item",
    status: "incomplete",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    task: "Second Item",
    status: "incomplete",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    task: "Third Item",
    status: "incomplete",
  },
];

let IItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default function Todo() {
  const [todos, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
    getData();
  }, [navigation]);

  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  function getData() {
    setLoading(true);
    setErrorMessage("");
    fetch(`${apiUrl}/todos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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

  function deleteData(idd) {
    if (!idd) return false;
    setLoading(true);
    setErrorMessage("");
    fetch(`${apiUrl}/todos/${idd}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setErrorMessage("");
        getData(); //go back to list view
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Network Error. Please try again.");
      });
  }

  const IItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <Link
          style={styles.title}
          href={{
            pathname: "/todo/details",
            params: { id: item.id || item._id },
          }}
        >
          {item.task || "Go to Details"}
        </Link>
      </TouchableOpacity>
      <Text style={styles.id}>#{item.id || item._id || ""}</Text>
      <Text style={styles.status}>{item.status || "N/A"}</Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Link
          style={styles.linkupdate}
          href={{
            pathname: "/todo/update",
            params: { id: item.id || item._id },
          }}
        >
          Edit
        </Link>
        <TouchableOpacity>
          <Text
            style={styles.linkDel}
            onPress={() => deleteData(item.id || item._id)}
          >
            DELETE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 22 }}>
      <Text style={styles.h1}>Todo List</Text>
      <View style={{ flex: 0.06, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity>
            <Link
              style={styles.btn}
              href={{
                pathname: "/home",
              }}
            >
              Home |
            </Link>
          </TouchableOpacity>
          <TouchableOpacity>
            <Link
              style={styles.btn}
              href={{
                pathname: "/todo/create",
              }}
            >
              Create Todo
            </Link>
          </TouchableOpacity>
          <Text style={styles.count}>{todos.length}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={todos}
          ItemSeparatorComponent={IItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <IItem style={styles.item} item={item} />}
          // renderItem={({item}) => <Text style={styles.item}>{item.id}</Text>}
          // keyExtractor={item => item.id}
        />
        <StatusBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  h1: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    display: "none",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "green",
  },
  id: {
    fontSize: 20,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 0.2,
    width: "100%",
    backgroundColor: "#e9e9e9",
  },
  count: {
    fontWeight: "bold",
    paddingLeft: 5,
  },
  btn: {
    fontSize: 20,
    display: "flex",
    flexDirection: "column",
    color: "blue",
    paddingRight: 5,
  },
  linkupdate: {
    color: "orange",
    fontSize: 16,
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
  },
  linkDel: {
    color: "red",
    fontSize: 16,
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    paddingLeft: 7,
  },
});
