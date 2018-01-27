import React from 'react'
import {
  Platform,
  ActionSheetIOS
} from 'react-native'
import topView from 'rn-topview'

import ActionSheetContainer from './ActionSheetContainer'

let instance

const saveInstance = (ref) => {
  instance = ref
}

const onAnimationEnd = (visible) => {
  if (!visible) {
    topView.remove()
  }
}

export default {
  showActionSheetWithOptions(config = {}, callback) {
    if (Platform.OS === 'ios' && !config.native) {
      ActionSheetIOS.showActionSheetWithOptions(config, callback);
    } else {
      topView.set(
        <ActionSheetContainer
          visible
          ref={saveInstance}
          onAnimationEnd={onAnimationEnd}
          callback={callback}
          {...config}
        />,
      );
    }
  },
}