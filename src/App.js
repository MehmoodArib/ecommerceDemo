import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
