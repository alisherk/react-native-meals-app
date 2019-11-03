import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderBtn';
import Colors from '../consts/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text> {props.label} </Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={props.value}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FilterScreen = props => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
      const appliedFilters = {
        flutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        vegetarian: isVegetarian
      };
      dispatch(setFilters(appliedFilters));
      
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
  

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}> Availabe filters </Text>
      <FilterSwitch
        label='Gluten-free'
        value={isGlutenFree}
        onChange={newVal => setIsGlutenFree(newVal)}
      />
      <FilterSwitch
        label='Lactose-free'
        value={isLactoseFree}
        onChange={newVal => setIsLactoseFree(newVal)}
      />
      <FilterSwitch
        label='Vegan'
        value={isVegan}
        onChange={newVal => setIsVegan(newVal)}
      />
      <FilterSwitch
        label='Vegetarian'
        value={isVegetarian}
        onChange={newVal => setIsVegetarian(newVal)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filtered Meals',
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  }
});
export default FilterScreen;
