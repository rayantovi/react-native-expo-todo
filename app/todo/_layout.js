import React from 'react';
import { View, Slot, Link, Stack, useNavigation } from 'expo-router';
import Header from './header';
import Footer from './footer';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TodoLayout() {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
            <Slot />
          <Footer />
        </SafeAreaView>
    </>
  );
}
