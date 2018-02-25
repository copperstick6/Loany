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
  AsyncStorage
} from 'react-native';
import ExampleView from './ExampleView'
import Spinner from 'react-native-loading-spinner-overlay';


export default class Buy extends Component {
	constructor(props){
		super(props)
		this.state = {
			visible: false,
			data: null
		}
		this.setSpinner = this.setSpinner.bind(this)
		this.navigateBuyLoan = this.navigateBuyLoan.bind(this)
	}
	componentWillMount(){
		this.setState({visible: true})
		AsyncStorage.getItem('name').then((value) =>
		{
			console.log(value)
			fetch("http://f53f49e2.ngrok.io/searchUserLoans?name=" + value)
			.then((response) => response.json())
			.then(function(data){
				console.log(data)
				if (data.length == 0){
					this.setState({data: "You currently own no loans."})
				}
				else{
					this.setState({data: data})
				}
			}.bind(this)).then(() => {this.setState({visible: false})}).bind(this)
	})
		this.setState({visible: false})
	}
	navigateBuyLoan(){
		this.props.navigation.navigate('BuyLoan')
	}
	setSpinner(){
		this.setState({visible: !this.state.visible})
	}
  render() {
	  let view = null
	  if(this.state.data != null){
		  view = <ExampleView spinnerSet = {this.setSpinner} data = {this.state.data} navigate = {this.navigateBuyLoan}/>
	  }
	return (
	  <View style={styles.container}>
	  <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
	  {view}
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
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
