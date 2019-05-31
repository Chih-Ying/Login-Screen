
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/LoginScreen';
import SuccessScreen from './src/SuccessScreen';

const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Success: { screen: SuccessScreen},
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

const App = createAppContainer(AppNavigator);

export default App;