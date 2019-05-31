import * as React from "react";
import { 
  Image, 
  KeyboardAvoidingView, 
  StyleSheet, 
  View 
} from "react-native";
import Button from "./components/Button";
import FormTextInput from "./components/FormTextInput";
import imageLogo from "./assets/images/logo.png";
import colors from "./config/colors";
import strings from "./config/strings";

interface State {
    email: string;
    password: string;
    emailTouched: boolean;
    passwordTouched: boolean;
    emailValid: boolean;
    passwordValid: boolean;
}

export default class LoginScreen extends React.Component<{}, State> {

    passwordInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        email: "",
        password: "",
        emailTouched: false,
        passwordTouched: false,
        emailValid: false,
        passwordValid: false
    };

    handleEmailChange = (email: string) => {
      emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (!emailValid) {
        this.setState({ email: email, emailValid: false });
        console.log("Email is Not Correct");
        return false;
      } else {
        console.log("Email is Correct");
        this.setState({ email: email, emailValid: true });
      }
    };
  
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
  
    handleEmailSubmitPress = () => {
      if (this.passwordInputRef.current) {
        this.passwordInputRef.current.focus();
      }
    };
  
    handleEmailBlur = () => {
      this.setState({ emailTouched: true });
    };
  
    handlePasswordBlur = () => {
      this.setState({ passwordTouched: true });
    };
  
    handleLoginPress = () => {
      console.log("Login button pressed");
    };


  render() {
    const {
      email,
      password,
      emailTouched,
      passwordTouched,
      emailValid,
      passwordValid
    } = this.state;

    const emailError =
        (!email && emailTouched) ? strings.EMAIL_REQUIRED :
        (!emailValid && emailTouched) ? strings.EMAIL_VALID : undefined;
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
              value={this.state.email}
              onChangeText={this.handleEmailChange}
              onSubmitEditing={this.handleEmailSubmitPress}
              placeholder={strings.EMAIL_PLACEHOLDER}
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onBlur={this.handleEmailBlur}
              error={emailError}
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
            <Button 
              label={strings.LOGIN} 
              onPress={this.handleLoginPress}
              disabled={!email || !password || !emailValid || !passwordValid}
            />
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
    }
  });
