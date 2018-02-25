import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Button,
  ScrollView
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

let CONTENT = [
  {
	title: 'View loans you own',
	content: BACON_IPSUM,
  },
  {
	title: 'Buy a new loan',
	content: BACON_IPSUM,
  },
];


const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#F5FCFF',
  },
  title: {
	textAlign: 'center',
	fontSize: 22,
	fontWeight: '300',
	marginBottom: 20,
  },
  header: {
	backgroundColor: '#F5FCFF',
	padding: 10,
  },
  headerText: {
	textAlign: 'center',
	fontSize: 16,
	fontWeight: '500',
  },
  content: {
	padding: 20,
	backgroundColor: '#fff',
  },
  active: {
	backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
	backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
	marginBottom: 10,
	flexDirection: 'row',
	justifyContent: 'center',
  },
  selector: {
	backgroundColor: '#F5FCFF',
	padding: 10,
  },
  activeSelector: {
	fontWeight: 'bold',
  },
  selectTitle: {
	fontSize: 14,
	fontWeight: '500',
	padding: 10,
  },
});

export default class SellLoanView extends Component {
	constructor(props){
		super(props)
		this.state = {
			  activeSection: false,
			  collapsed: true,
			  ready: false
		};
		this._renderContent = this._renderContent.bind(this)
	}
	componentWillMount(){
	}

  _toggleExpanded = () => {
	this.setState({ collapsed: !this.state.collapsed });
  }

  _setSection(section) {
	this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
	return (
	  <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
		<Text style={styles.headerText}>{section.title}</Text>
	  </Animatable.View>
	);
  }

  _renderContent(section, i, isActive) {
	  var ItemList = "Hi"
	return (
	  <Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
		{ItemList}
	  </Animatable.View>
	);
}

  render() {

	return (
	  <View style={styles.container}>
		  <Accordion
			activeSection={this.state.activeSection}
			sections={CONTENT}
			renderHeader={this._renderHeader}
			renderContent={this._renderContent}
			onPress = {() => console.log("hi")}
			duration={400}
			onChange={this._setSection.bind(this)}
		  />

	  </View>
	);
  }
}
