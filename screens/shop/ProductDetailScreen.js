import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
const ProductDetailScreen = props => {
  //const productTitle = props.navigation.getParam('title');
  const productId = props.route.params.id;
  const products = useSelector(state => state.products.availableProducts);

  const foundProduct = products.find(item => item.id === productId);

  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: foundProduct.imageUrl }} />
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(foundProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${foundProduct.price}</Text>
      <Text style={styles.description}>{foundProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  action: {
    textAlign: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    // marginHorizontal: 50,
    textAlign: 'center',
    fontFamily: 'open-sans',
  },
});

export default ProductDetailScreen;
