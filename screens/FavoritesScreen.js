import React from 'react';
import MealList from '../components/MealList';
import { View, StyleSheet } from 'react-native'; 
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderBtn';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = props => {
  const availMeals = useSelector(state => state.meals.favMeals);

  if (availMeals.length === 0 || !availMeals) {
    return (
      <View style={styles.content}>
        <DefaultText> No favorite Meals Found. Start adding some </DefaultText>
      </View>
    );
  }
  return <MealList listData={availMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
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

const styles = StyleSheet.create({
   content: {
     flex: 1, 
     justifyContent: 'center', 
     alignItems: 'center'
   }
});

export default FavoritesScreen;
