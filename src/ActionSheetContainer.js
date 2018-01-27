import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing
} from 'react-native'
import Dimensions from 'Dimensions';

import TouchableNativeFeedback from './TouchableNativeFeedback'

const window = Dimensions.get('window');

const DefaultTransitionSpec = {
  duration: 250,
  easing: Easing.bezier(0.32, 1, 0.32, 1)
}

export default class ActionSheetContainer extends React.Component {
  static defaultProps = {
    options: [],
    position: 'bottom'
  }

  state = {
    height: window.height
  }

  _springValue = new Animated.Value(0)

  componentDidMount () {
    setTimeout(() => {
      this._animate(1);
    }, 100)
  }

  _animate = (toValue, cb = () => {}) => {
    Animated.timing(this._springValue, {
      toValue,
      ...DefaultTransitionSpec
    })
    .start(cb);
  }

  _onClose = (index) => {
    this.props.callback(index);
    this._animate(0, () => {
      this.props.onAnimationEnd();
    });
  }

  _contentRender = () => {
    const { cancelButtonIndex, options, destructiveButtonIndex, position } = this.props
    let optionsArr = cancelButtonIndex ? options.filter((option, index) => index !== cancelButtonIndex) : optionsArr
    let contentAnim = this._springValue.interpolate({
      inputRange: [0, 1],
      outputRange: [position === 'bottom' ? this.state.height : -this.state.height, 0],
    });
    let contentStyle = {
      maxHeight: window.height * .7,
      transform: [
        {
          translateY: contentAnim
        }
      ]
    }
    if (position === 'bottom') {
      contentStyle.bottom = 0
    } else {
      contentStyle.top = 0
    }
    return (
      <Animated.View
        style={[styles.content, contentStyle]}
        onLayout={e => {
          this.setState({
            height: e.nativeEvent.layout.height
          });
        }}
      >
        <ScrollView bounces={false}>
          {
            optionsArr.map((option, index) => 
              <TouchableNativeFeedback
                key={index}
                style={
                  [
                    styles.cell,
                    index !== 0 && styles.border
                  ]
                }
                onPress={() => this._onClose(index)}
              >
                <Text
                  style={[
                    styles.text,
                    destructiveButtonIndex && (destructiveButtonIndex === index) && styles.destructiveButton
                  ]}
                >
                  {option}
                </Text>
              </TouchableNativeFeedback>
            )
          }
        </ScrollView>
        {
          cancelButtonIndex &&
          <TouchableNativeFeedback
            style={[styles.cell, styles.indexcancelButton]}
            onPress={() => this._onClose(cancelButtonIndex)}
          >
            <Text style={styles.text}>{options[cancelButtonIndex]}</Text>
          </TouchableNativeFeedback>
        }
      </Animated.View>
    )
  }
  render () {
    const maskAnim = this._springValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.mask, {opacity: maskAnim}]}/>
        {this._contentRender()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  content: {
    position: 'absolute',
    width: window.width,
    backgroundColor: '#efeff4'
  },
  cell: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  border: {
    borderTopWidth: 1,
    borderColor: '#EFEFF4'
  },
  indexcancelButton: {
    marginTop: 6
  },
  text: {
    textAlign: 'center'
  },
  destructiveButton: {
    color: '#ff4d4f'
  }
})