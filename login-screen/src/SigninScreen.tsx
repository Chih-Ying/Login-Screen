import React from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    Button,
    KeyboardAvoidingView
  } from 'react-native';
import WideButton from "./components/WideButton";
import FormTextInput from "./components/FormTextInput";
import colors from "./config/colors";
import strings from "./config/strings";

interface State {
    username: string;
    email: string;
    password: string;
    confirm: string;
    usernameTouched: boolean;
    emailTouched: boolean;
    passwordTouched: boolean;
    confirmTouched: boolean;
    emailValid: boolean;
    passwordValid: boolean;
    confirmValid: boolean;
}

export default class SigninScreen extends React.Component<{}, State>  {

    passwordInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        username: "",
        email: "",
        password: "",
        confirm: "",
        usernameTouched: false,
        emailTouched: false,
        passwordTouched: false,
        confirmTouched: false,
        emailValid: false,
        passwordValid: false,
        confirmValid: false
    };

    handleUsernameChange = (username: string) => {
        this.setState({username: username});
    }

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

    handleConfirmChange = (confirm: string) => {
        if (this.state.password === confirm) {
            this.setState({confirm: confirm, confirmValid: true});
        } else {
            this.setState({confirm: confirm, confirmValid: false});
            return false;
        }
    }
  
    handleEmailSubmitPress = () => {
      if (this.passwordInputRef.current) {
        this.passwordInputRef.current.focus();
      }
    };

    handleUsrnameBlur = () => {
        this.setState({ usernameTouched: true });
    };
  
    handleEmailBlur = () => {
      this.setState({ emailTouched: true });
    };
  
    handlePasswordBlur = () => {
      this.setState({ passwordTouched: true });
    };

    handleConfirmBlur = () => {
        this.setState({ confirmTouched: true });
    };

    handleWideButtonPress = () => {
      this.props.navigation.navigate('Login');
    };

    handleBackPress = () => {
      this.props.navigation.navigate('Login');
    }
  
      render() {
        const {
            username,
            email,
            password,
            confirm,
            usernameTouched,
            emailTouched,
            passwordTouched,
            confirmTouched,
            emailValid,
            passwordValid,
            confirmValid
          } = this.state;

          const usernameError = 
               !username && usernameTouched ?
               strings.USERNAME_REQUIRED : undefined;
      
          const emailError =
              (!email && emailTouched) ? strings.EMAIL_REQUIRED :
              (!emailValid && emailTouched) ? strings.EMAIL_VALID : undefined;

          const passwordError =
              (!password && passwordTouched) ? strings.PASSWORD_REQUIRED :
              (!passwordValid && passwordTouched) ? strings.PASSWORD_VALID : undefined;
          
          const confirmError = 
              (!confirm && confirmTouched) ? strings.CONFIRM_REQUIRED :
              (!confirmValid && confirmTouched) ? strings.CONFIRM_VALID : undefined;

          return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding">
                <View style={styles.form}>
                <Text style={styles.titleText}>Sign In</Text>
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
                  returnKeyType="next"
                  onBlur={this.handlePasswordBlur}
                  error={passwordError} 
                />
                <FormTextInput
                  value={this.state.confirm}
                  onChangeText={this.handleConfirmChange}
                  placeholder={strings.CONFIRM_PLACEHOLDER}
                  secureTextEntry={true}
                  returnKeyType="done"
                  onBlur={this.handleConfirmBlur}
                  error={confirmError} 
                />
                <WideButton 
                  label={strings.SIGNIN} 
                  onPress={this.handleWideButtonPress}
                  disabled={!username || !email || !password || !confirm || 
                    !emailValid || !passwordValid || !confirmValid}
                />
                <Button
                  title="Cancel"
                  onPress={this.handleBackPress}
                />
            </View> 
            </KeyboardAvoidingView>
          )
        }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center',
      height: 100,
      lineHeight: 100
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%"
      }
  });