import React from "react";
import { Stack, Redirect, useNavigation, useRootNavigation } from 'expo-router';
import { View, Text } from 'react-native-web';

// https://docs.expo.dev/router/advanced/router-settings/
export const unstable_settings = {
  // Used for `(foo)`
  initialRouteName: 'home',
  // Used for `(bar)`
  // todo: {
  //   initialRouteName: 'index',
  // },
  // bar: {
  //   initialRouteName: 'second',
  // },
};

export default function Layout() {
  const navigation = useRootNavigation();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!navigation?.isReady) return;

    setReady(true);
  }, [navigation?.isReady]);

  if (ready) return <Redirect href="/home" />;
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        
      }}

      // initialRouteName="index"
    >{/* Optionally configure static options outside the route. */}
      {/* <Stack.Screen name="index" options={{}} /> */}
      <Stack.Screen name="Home" options={{}} />
      <Stack.Screen name="Details" options={{}} />
      <Stack.Screen name="settings" options={{}} />
    </Stack>
  );
}
