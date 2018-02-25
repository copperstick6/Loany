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
  TextInput,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Signup extends Component<Props> {
	constructor(props){
		super(props)
		this.state = {
			name: "",
			score: "",
			visible: false

		}
		this.handleSubmission = this.handleSubmission.bind(this)
	}
	async handleSubmission(){
		if(this.state.name == "" || this.state.score.length != 3 || parseInt(this.state.score) < 200 || parseInt(this.state.score) > 800){
			Alert.alert('Error with Submission', 'One or more of the two fields is empty or the credit score is invalid. Please resolve this issue before submitting again.')
			return
		}
		this.setState({visible: true})
		try{
			await AsyncStorage.setItem('isNew', "false")
			await AsyncStorage.setItem('name', this.state.name)
			await AsyncStorage.setItem('score', this.state.score)
		}
		catch(error){
			console.log(error)
			Alert.alert("Error with memory, out of space. Please clear some space and try again", error)
		}
		await fetch("http://f53f49e2.ngrok.io/add_user?name=" + this.state.name+"&credit_score=" + this.state.score)
		this.setState({visible: false})
		this.props.navigation.navigate('Home')
	}

  render() {
	return (
	  <View style={styles.container}>
	  <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
	  <Text>{"\n"}</Text>
	  <Text>{"\n"}</Text>
	  <Text>{"\n"}</Text>
	  <TextInput
	  style={{ textAlign: 'center'}}
		 onChangeText={(name) => this.setState({name})}
		 value={this.state.name}
		 placeholder="Type your full name here"
		 editable = {true}
	   />
	   <Text>{"\n"}</Text>
	   <TextInput
	   style={{textAlign: 'center'}}
		  onChangeText={(score) => this.setState({score})}
		  value={this.state.score}
		  placeholder="Type your Credit Score here"
		  editable = {true}
		 keyboardType='numeric'
		 maxLength={3}
		/>
		<Text>{"\n"}</Text>
		<Button onPress={this.handleSubmission} title="Submit Info"></Button>
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
