import React from "react";
import { StyleSheet} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from "./components/Homepage";


const Stack = createStackNavigator();

function App(props) {
  return <Homepage/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  image1: {
    width: 215,
    height: 215, 
  },
  image: {
    alignItems:"center",
    marginTop:20,
    backgroundColor:"white"
  },
  rect: {
    backgroundColor: "#9DE2FF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "visible",
    flex:1,
  },
});

export default App;
