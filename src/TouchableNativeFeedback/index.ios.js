import React from 'react'
import {
  TouchableOpacity
} from 'react-native';

export default ({
  style,
  children,
  ...props
}) => (
  <TouchableOpacity
    style={style}
    children={children}
    activeOpacity={.8}
    {...props}
  >
    {children}
  </TouchableOpacity>
)