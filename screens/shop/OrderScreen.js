import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={itemData => (
        <OrderItem items={itemData.item.items} amount={itemData.item.totalAmount} date={itemData.item.readableDate} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default OrderScreen;
