import React from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  Button
} from 'react-native';

export default class SuccessScreen extends React.Component {

  handleBackPress = () => {
    this.props.navigation.state.params.reset();
    this.props.navigation.navigate('Login');
  }

    render() {

        return (
          
           <View style={styles.container}>
              <Text style={styles.titleText}>Welcome to IRVINE COMPANY.</Text>
              <Button
                title="Log out"
                onPress={this.handleBackPress}
              />
          </View> 
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      margin:30,
    }
  });