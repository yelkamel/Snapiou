import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CountDown from '../common/CountDown';
import MagicText from '../common/MagicText';
import styles from './styles';

import {
  getRandomColor,
  getRandomSentence,
  getRandomEffect
} from '../../utils'

export default class App extends Component {
  state = {
    takePicture: false,
    path: null
  }

  takePicture = async () => {
    this.setState(state => ({ ...state, takePicture: true }), async () => {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          //   fixOrientation: true,
          mirrorImage: true,
        };
        const data = await this.camera.takePictureAsync(options);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        this.setState(state => ({
          ...state,
          path: data.uri
        }))
      }
    })
  };

  renderImage() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({
            path: null,
            takePicture: false
          })}
        >
          Cancel
        </Text>
      </View>
    );
  }

  render() {
    const { goCount, takePicture, path } = this.state

    if (path !== null)
      return (this.renderImage())

    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />

        <View style={styles.absoluteCenter}>
          {
            !takePicture &&
            <CountDown
              startAt={3}
              finish={this.takePicture}
              delay={2000}
              color={getRandomColor()}
              sentence={getRandomSentence()}
              effect={getRandomEffect()}
            />
          }
        </View>
      </View>
    );
  }
}

