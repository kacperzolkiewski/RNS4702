import React from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type FirstTabStackParamList = {
  FirstTabHome: undefined;
  NestedScreen: undefined;
};

type TabParamList = {
  FirstTab: undefined;
  SecondTab: undefined;
  ThirdTab: undefined;
};

const Tabs = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<FirstTabStackParamList>();

function FirstTabHome({
  navigation,
}: NativeStackScreenProps<FirstTabStackParamList, 'FirstTabHome'>) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>First tab</Text>
      <Button
        title="Go to nested screen"
        onPress={() => navigation.navigate('NestedScreen')}
      />
    </View>
  );
}

function NestedScreen({
  navigation,
}: NativeStackScreenProps<FirstTabStackParamList, 'NestedScreen'>) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Nested screen</Text>
      <Text style={styles.description}>
        This screen is inside the first tab's native stack.
      </Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function FirstTab() {
  return (
    <Stack.Navigator screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen
        name="FirstTabHome"
        component={FirstTabHome}
        options={{ title: 'First tab' }}
      />
      <Stack.Screen
        name="NestedScreen"
        component={NestedScreen}
        options={{ title: 'Nested screen' }}
      />
    </Stack.Navigator>
  );
}

function SecondTab() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Second tab</Text>
    </SafeAreaView>
  );
}

function ThirdTab() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Third tab</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator
          implementation="native"
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen
            name="FirstTab"
            component={FirstTab}
            options={{
              title: 'First',
              tabBarIcon:
                Platform.OS === 'ios'
                  ? { type: 'sfSymbol', name: 'house' }
                  : { type: 'materialSymbol', name: 'home' },
            }}
          />
          <Tabs.Screen
            name="SecondTab"
            component={SecondTab}
            options={{
              title: 'Second',
              tabBarIcon:
                Platform.OS === 'ios'
                  ? { type: 'sfSymbol', name: 'star' }
                  : { type: 'materialSymbol', name: 'star' },
            }}
          />
          <Tabs.Screen
            name="ThirdTab"
            component={ThirdTab}
            options={{
              title: 'Third',
              tabBarIcon:
                Platform.OS === 'ios'
                  ? { type: 'sfSymbol', name: 'gearshape' }
                  : { type: 'materialSymbol', name: 'settings' },
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
});
