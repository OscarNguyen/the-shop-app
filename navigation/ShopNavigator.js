import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import { Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import CartScreen from '../screens/shop/CartScreen';
const Stack = createStackNavigator();

const ShopNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans',
        },
      }}
    >
      <Stack.Screen
        name="All Products"
        component={ProductOverviewScreen}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                  navigation.navigate('Cart Detail');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name="Cart Detail" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default ShopNavigator;

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
// import Colors from '../constants/Colors';
// import { Platform } from 'react-native';
// const ProductsNavigator = createStackNavigator(
//   {
//     ProductOverviewScreen: ProductOverviewScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
//       },
//       headerTintColor: Platform.OS === 'android?' ? 'white' : Colors.primary,
//     },
//   },
// );

// export default createAppContainer(ProductsNavigator);
