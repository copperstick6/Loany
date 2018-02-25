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
  ScrollView,
  AsyncStorage,
  Button,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import SellLoanView from './SellLoanView'

export default class Sell extends Component<Props> {
	constructor(props){
		super(props)
		this.state = {visible: false, data: null}
		this.buyNow = this.buyNow.bind(this)
	}
	buyNow(text){
		console.log("hi")
		console.log(text)
	}
	componentWillMount(){
		this.setState({visible: true})
		AsyncStorage.getItem('name').then((value) =>
		{
			console.log(value)
			fetch("http://f53f49e2.ngrok.io/displayUserLoans?name=" + value)
			.then((response) => response.json())
			.then(function(data){
				console.log(data)
				if (data.length == 0){
					this.setState({data: "No Loans currently available"})
				}
				else{
					this.setState({data: data})
				}
			}.bind(this))
		}).then(()=>{this.setState({visible: false})})
	}
  render() {
	  let item = null
	  if(this.state.data != null){
		  if(this.state.data == "No Loans currently available"){
			  item = <Text style={{textAlign: 'center', fontSize: 15}}>No Loans currently available</Text>
		  }
		  else{
			  item = this.state.data.map(function(loans){
				  return <View><Text style={{textAlign: 'center', fontSize: 15}}>Loan Amount: ${loans["amount"]}. Rate: {loans['rate']}% Owner: {loans['owner']} {"\n"}</Text><Button onPress={() => this.buyNow("hi")} id = {loans} title="Buy this Loan">{loans}</Button></View>
			  })
		  }

	  }
	return (
	  <View style={styles.container}>
	  <Text>{"\n"}</Text>
	  <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
	  <ScrollView>
			  {item}
	  </ScrollView>
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
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
