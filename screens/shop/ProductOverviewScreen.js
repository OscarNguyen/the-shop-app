import React from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id,title)=>{
    props.navigation.navigate('Product Detail', { title: title, id: id });

  }
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={()=>{
            selectItemHandler(itemData.item.id,itemData.item.title)
          }}
        
        >
          <Button color={Colors.primary} title="View Details" onPress={()=>{
            selectItemHandler(itemData.item.id,itemData.item.title)
          }} />
          <Button color={Colors.primary} title="To Cart" onPress={()=>{
            dispatch(cartActions.addToCart(itemData.item));

          }} />
        </ProductItem>
      )}
    />
  );
};

export default ProductOverviewScreen;

ProductOverviewScreen.navigationOptions = {
  title: 'All Products',
};
const styles = StyleSheet.create({});
