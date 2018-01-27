import React from 'react'
import {
  View,
  TouchableNativeFeedback
} from 'react-native';

export default ({
  style,
  children,
  ...props
}) => (
  <TouchableNativeFeedback
    {...props}
  >
    <View style={style}>
      {children}
    </View>
  </TouchableNativeFeedback>
)