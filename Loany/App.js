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
  Image,
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


export default class App extends Component<{}> {
	static navigationOptions =({navigation}) => ({
	  title: 'Welcome',
	});

  constructor(props){
	  super(props)
	  this.state = {isNew: true, visible: true}
  }
  async componentWillMount(){
	  this.setState({visible: true})
	  try {
		  const isNew = await AsyncStorage.getItem("isNew")
		  console.log(isNew)
		  console.log(this.state.visible)
		  if (isNew == null){
			  this.setState({isNew: true, visible: false})
		  }
		  else if (isNew == true){
			  this.setState({isNew: true, visible: false})
		  }
		  else{
			  this.setState({isNew: false, visible: false})
		  }
	  }
	  catch(error){
		  this.setState({isNew: true, visible: false})
	  }
	  this.setState({visible: false})

  }
  render() {
	  let signup = null
	  if(this.state.isNew){
		  signup = <Button onPress={() => this.props.navigation.navigate('Signup')} title="Get Started"></Button>
	  }
	  else{
		  signup = <Button onPress={() => this.props.navigation.navigate('Transactions')} title="Buy/Sell"></Button>
	  }
	return (
	  <View style={styles.container}>
	  <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
	  <Image source={require('./lonewolf.png')} style = {styles.image} />
		<Text style={styles.welcome}>
		  Welcome to Loany!
		</Text>
		<Text style={styles.text}>
		  This is a mobile application that is designed to allow you
		  to obtain loans and purchase/sell existing loans you may own
		</Text>
		<Text>{"\n"}</Text>
		{signup}
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
