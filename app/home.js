import { Link, Stack } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  );
}

export default function home() {
  return (
    <View style={{ flex: 1, padding:15 }}>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'My home',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
          <Text style={{fontSize:30}}>Home Screen</Text>
          <Link style={styles.listLink} href="/home">Home</Link>
          <Link style={styles.listLink}  href="/details">Details</Link>
          <Link style={styles.listLink}  href="/settings">Settings</Link>
          <Link style={styles.listLink}  href="/todo">Todo</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listLink: {
    flexDirection: "column",
    color: 'blue',
    fontSize: 22
    
  }
});