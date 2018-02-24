/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

export default class App extends Component<{}> {
	static navigationOptions =({navigation}) => ({
	  title: 'Welcome',
	});
  render() {
	return (
	  <View style={styles.container}>
	  <Image source={require('./lonewolf.png')} style = {styles.image} />
		<Text style={styles.welcome}>
		  Welcome to Loany!
		</Text>
		<Text style={styles.text}>
		  This is a mobile application that is designed to allow you
		  to obtain loans and purchase/sell existing loans you may own
		</Text>
		<Text>{"\n"}</Text>
		<Button onPress={() => this.props.navigation.navigate('Transactions')} title="Get Started"></Button>

	  </View>
	);
  }
}

const styles = StyleSheet.create({
	container: {
	  flex: 3,
	  justifyContent: 'flex-start',
	  alignItems: 'center',
	  backgroundColor: '#F5FCFF',
	},
  welcome: {
	fontSize: 25,
	textAlign: 'center',
	margin: 10,
  },
  text: {
   fontSize: 15,
   textAlign: 'center',
   margin: 10,
  },
  image: {
	  marginTop: 3,
	  height: '35%',
	  width: '75%',
	  resizeMode: "contain",
	  backgroundColor: '#F5FCFF',
  },
});
