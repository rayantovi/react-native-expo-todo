import { Button, View, Text, StyleSheet } from "react-native";


export default function Header() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List Header</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
    padding:5,
    maxHeight:120,
    minHeight: "auto",
    backgroundColor: '#bbb'
  },
  title: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    
    fontSize: 30,
  }
});
