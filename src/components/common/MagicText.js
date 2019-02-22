import React from 'react';
import { View } from 'react-native';
import RNMorphingText from 'react-native-morphing-text';



const MagicText = ({ style, error, refField, containerStyle, ...rest }) => (

  <RNMorphingText
    effect={'Scale'}
    size={80}
    color={"#000000"}
  >
    READY GO !
    </RNMorphingText>
);

MagicText.defaultProps = {
};

export default MagicText;
