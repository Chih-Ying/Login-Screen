import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from "react-native";
import colors from "../config/colors";

type Props = TextInputProps & {
  error?: string;
};

class FormTextInput extends React.Component<Props> {
  textInputRef = React.createRef<TextInput>();

  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  render() {
    const { error, style, ...otherProps } = this.props;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.textInputRef}
          selectionColor={colors.DODGER_BLUE}
          style={styles.textInput}
          {...otherProps}
        />
        <Text style={styles.errorText}>{error || ""}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  textInput: {
    height: 40,
    borderColor: colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  errorText: {
    height: 20,
    color: colors.TORCH_RED
  }
});

export default FormTextInput;