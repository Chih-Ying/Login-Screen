
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/LoginScreen';
import SuccessScreen from './src/SuccessScreen';
import SigninScreen from './src/SigninScreen';

const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Success: { screen: SuccessScreen},
    Signin: { screen: SigninScreen},
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

const App = createAppContainer(AppNavigator);

export default App;