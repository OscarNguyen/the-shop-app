import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import { Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenOptions = {
  headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

const AdminNavigator = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen
      name="User Product"
      component={UserProductScreen}
      options={({ navigation }) => ({
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add"
              iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              onPress={() => {
                navigation.navigate('Edit Product');
              }}
            />
          </HeaderButtons>
        )
      })}
    />
    <Stack.Screen name="Edit Product" component={EditProductScreen}/>
  </Stack.Navigator>
);

const ProductNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
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
                  navigation.navigate('Your Cart');
                }}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
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
      <Stack.Screen name="Your Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Orders"
      component={OrderScreen}
      options={({ navigation, route }) => ({
        title: 'Your Orders',

        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
      })}
    />
  </Stack.Navigator>
);
const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={defaultScreenOptions}
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <Drawer.Screen
        name="Products"
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={size} color={color} />
          ),
        }}
        component={ProductNavigator}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
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
