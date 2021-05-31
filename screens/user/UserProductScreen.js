import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector ,useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import {deleteProduct} from '../../store/actions/products';
const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const navigateToEditProductScreen = (id) =>{
    props.navigation.navigate('Edit Product',{productId:id});
  }
  return (

    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={()=>navigateToEditProductScreen(itemData.item.id)}
        >
          <Button color={Colors.primary} title="Edit" onPress={()=>navigateToEditProductScreen(itemData.item.id)} />
          <Button color={Colors.primary} title="Delete" onPress={() => {dispatch(deleteProduct(itemData.item.id))}} />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;
