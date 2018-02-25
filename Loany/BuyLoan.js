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
  AsyncStorage,
  TextInput,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


export default class BuyLoan extends Component<{}> {
	static navigationOptions =({navigation}) => ({
	  title: 'Buy Loan',
	});

  constructor(props){
	  super(props)
	  this.state = {visible: false, amount: "", rate: ""}
	  this.handleSubmission = this.handleSubmission.bind(this)
  }
  handleSubmission(){
	  console.log(this.state.amount)
	  amount = this.state.amount
	  if (this.state.amount = "" || this.state.rate == "" || parseFloat(this.state.rate) < 0 || parseFloat(this.state.rate) > 100){
		  Alert.alert("Error with submission, rate out of range(must be between 0-100) or field empty. Please revise and resubmit.")
	  }
	  AsyncStorage.getItem('name').then((value) =>{
		  console.log(this.state.amount)
		  console.log(amount)
		  fetch("http://f53f49e2.ngrok.io/buy_new_loan?name="+value + "&amount=" + amount + "&rate=" + String(this.state.rate))
	  }).then(()=> {this.props.navigation.navigate('Transactions')})

  }

  render() {
	return (
	  <View style={styles.container}>
	  <Text>{"\n"}</Text>
	  <Text>{"\n"}</Text>
	  <Text>{"\n"}</Text>
	  <TextInput
	  style={{ textAlign: 'center'}}
		 onChangeText={(amount) => this.setState({amount})}
		 value={this.state.amount}
		keyboardType='numeric'
		 placeholder="Amount you want a loan for"
		 editable = {true}
	   />
	   <Text>{"\n"}</Text>
	   <TextInput
	   style={{textAlign: 'center'}}
		  onChangeText={(rate) => this.setState({rate})}
		  value={this.state.rate}
		  placeholder="Loan Rate"
		  editable = {true}
		 keyboardType='numeric'
		/>
		<Text>{"\n"}</Text>
		<Button onPress={this.handleSubmission} title="Submit Loan"></Button>
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	justifyContent: 'center',
  },
  welcome: {
	fontSize: 20,
	textAlign: 'center',
	margin: 10,
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
