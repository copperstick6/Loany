import { AppRegistry } from 'react-native';
import App from './App';
import Buy from './Buy'
import Sell from './Sell'
import BuyLoan from './BuyLoan'
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import Signup from './Signup'

const TransactionNavigator = TabNavigator({
	"Your Loans": {screen: Buy},
	"Trade Loans": {screen: Sell}
})

const Loany = StackNavigator({
	Home: {screen: App},
	Transactions: {screen: TransactionNavigator},
	Signup: {screen: Signup},
	BuyLoan: {screen: BuyLoan}
})

AppRegistry.registerComponent('Loany', () => Loany);
