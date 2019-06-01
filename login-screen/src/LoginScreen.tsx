import * as React from "react";
import { 
  Image, 
  KeyboardAvoidingView, 
  StyleSheet,
  Button, 
  Text,
  View 
} from "react-native";
import WideButton from "./components/WideButton";
import FormTextInput from "./components/FormTextInput";
import imageLogo from "./assets/images/logo.png";
import colors from "./config/colors";
import strings from "./config/strings";

interface State {
    username: string;
    password: string;
    usernameTouched: boolean;
    passwordTouched: boolean;
    usernameValid: boolean;
    passwordValid: boolean;
}

const initoalState = {
  username: "",
    password: "",
    usernameTouched: false,
    passwordTouched: false,
    usernameValid: false,
    passwordValid: false
}

export default class LoginScreen extends React.Component<{}, State> {

    passwordInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        username: "",
        password: "",
        usernameTouched: false,
        passwordTouched: false,
        usernameValid: false,
        passwordValid: false
    };

    handleUsernameChange = (username: string) => {
      this.setState({username: username});
    }
  
    handlePasswordChange = (password: string) => {
      passwordValid = password.length >= 6;
      if (!passwordValid) {
        this.setState({ password: password, passwordValid: false });
        console.log("password is Not Correct");
        return false;
      } else {
        console.log("password is Correct");
        this.setState({ password: password, passwordValid: true });
      }
    };
  
  
    handleUsrnameBlur = () => {
      this.setState({ usernameTouched: true });
    };
  
    handlePasswordBlur = () => {
      this.setState({ passwordTouched: true });
    };

    handleWideButtonPress = () => {
      this.props.navigation.navigate('Success', {reset: this.reset.bind(this)})
    };

    handleButtonPress = () => {
      this.props.navigation.navigate('Signin', {reset: this.reset.bind(this)})
    };

    reset() {
      this.setState(initoalState);
    }

  render() {
    const {
      username,
      password,
      usernameTouched,
      passwordTouched,
      passwordValid
    } = this.state;

    const usernameError = 
        !username && usernameTouched ?
        strings.USERNAME_REQUIRED : undefined;

    const passwordError =
        (!password && passwordTouched) ? strings.PASSWORD_REQUIRED :
        (!passwordValid && passwordTouched) ? strings.PASSWORD_VALID : undefined;
    
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <Image source={imageLogo} style={styles.logo} />
          <View style={styles.form}>
            <FormTextInput
              value={this.state.username}
              onChangeText={this.handleUsernameChange}
              placeholder={strings.USERNAME_PLACEHOLDER}
              autoCorrect={false}
              returnKeyType="next"
              onBlur={this.handleUsrnameBlur}
              error={usernameError}
            />
            <FormTextInput
              ref={this.passwordInputRef}
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              secureTextEntry={true}
              returnKeyType="done"
              onBlur={this.handlePasswordBlur}
              error={passwordError} 
            />
            <WideButton 
              label={strings.LOGIN} 
              onPress={this.handleWideButtonPress}
              disabled={!username || !password || !passwordValid}
            />
            <Text style={styles.signinText}>Don't have an account? 
              <Text style={styles.signinPressedText} 
                    onPress={this.handleButtonPress}>
                    Sign In
                    </Text>
            </Text>

          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
      alignItems: "center",
      justifyContent: "space-between"
    },
    logo: {
      flex: 1,
      width: "100%",
      resizeMode: "contain",
      alignSelf: "center"
    },
    form: {
      flex: 1,
      justifyContent: "center",
      width: "80%"
    },
    signinText: {
      fontSize: 16,
      textAlign: 'center'
    },
    signinPressedText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.DODGER_BLUE
    }
  });
