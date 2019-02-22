import { Platform } from 'react-native';

import {
  COLOR_ARRAY,
  SENTENCE_ARRAY,
  EFFECT_IOS_ARRAY,
  EFFECT_ANDROID_ARRAY
} from './data'

export const getRandomItem = (array) => {
  return (array[Math.floor(Math.random() * array.length)]);
};

export const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export const getRandomColor = () => getRandomItem(COLOR_ARRAY);
export const getRandomSentence = () => getRandomItem(SENTENCE_ARRAY);

export const getRandomEffect = () => {
  if (Platform.OS === 'ios')
    return getRandomItem(EFFECT_IOS_ARRAY)

  return getRandomItem(EFFECT_ANDROID_ARRAY)
}

