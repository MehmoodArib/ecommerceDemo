import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
