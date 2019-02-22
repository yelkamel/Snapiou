import React, { PureComponent } from 'react';
import {
  Easing,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import RNMorphingText from 'react-native-morphing-text';

const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  timeTxt: {
    fontSize: 50,
  },
});


class CountDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.startAt,
      startCount: false
    }
    this.AnimationValue = new Animated.Value(1)
  }

  animateText() {
    Animated.delay(1000).start(() => {
      this.setState(state => ({ ...state, number: state.number - 1 }), () => {
        this.AnimationValue.setValue(1)
        if (this.state.number !== 1) {
          this.animateText()
        } else {
          Animated.delay(1000).start(() => {
            this.props.finish()
          })
        }
      })
    })
  }

  componentDidMount() {
    Animated.timing(this.AnimationValue, {
      toValue: 0,
      delay: this.props.delay
    }).start(() => {
      this.setState(state =>
        ({
          ...state,
          startCount: true
        }),
        this.animateText)
    });
  }

  renderText() {
    const { number, startCount } = this.state;

    if (startCount) {
      return (
        <RNMorphingText
          effect={this.props.effect}
          size={100}
          color={this.props.color}
          height={200}
          width={80}
        >
          {number.toString()}
        </RNMorphingText>
      )
    } else {
      return (
        <Animated.Text
          style={[styles.timeTxt, {
            color: this.props.color,
            opacity: this.AnimationValue.interpolate({
              inputRange: [0, 0.5],
              outputRange: [0, 1],
            }),
            transform: [
              {
                scale: this.AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          }]}
        >
          {this.props.sentence}
        </Animated.Text>
      )
    }

  }

  render() {
    const { number, startCount } = this.state;

    return (
      <View style={{ alignSelf: 'center', alignItems: 'center' }}>
        {this.renderText()}
      </View >

    );
  }
}

CountDown.propTypes = {
  startAt: PropTypes.number.isRequired,
  finish: PropTypes.func.isRequired,
  sentence: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  effect: PropTypes.string.isRequired,
};

export default CountDown

