import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import { enableScreens } from 'react-native-screens';
enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

//remove composeWithDevTools before deployment

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
