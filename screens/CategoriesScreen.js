import React from 'react';
import { FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CatGridTile from '../components/CatGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderBtn';

const CategoriesScreen = props => {
  function renderGridItem(itemData) {
    return (
      <CatGridTile
        color={itemData.item.color}
        title={itemData.item.title}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'MealsCategory',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  }
  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meals Categories',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default CategoriesScreen;
