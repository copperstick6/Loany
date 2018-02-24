import { AppRegistry } from 'react-native';
import App from './App';
import Buy from './Buy'
import Sell from './Sell'
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';

const TransactionNavigator = TabNavigator({
	"Buy": {screen: Buy},
	"Sell": {screen: Sell}
})

const Loany = StackNavigator({
	Home: {screen: App},
	Transactions: {screen: TransactionNavigator},
})

AppRegistry.registerComponent('Loany', () => Loany);
