import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCirlce = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut: React.FC<{
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  textColor?: string;
  max?: number;
}> = ({
  percentage = 100,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 200,
  textColor = '#444',
  max = 100,
}) => {
  const inputRef = useRef<TextInput>(null);

  const circleRef = useRef<any>(); // TODO
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  const animatedValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {});
  };

  useEffect(() => {
    animation(percentage);

    animatedValue.addListener(v => {
      const maxPerc = (100 * v.value) / max;
      if (circleRef?.current) {
        const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${maxPerc.toFixed(2)}%`,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);

  const width = radius * 2;
  const height = radius * 2;
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCirlce
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 4, color: textColor ?? color },
          {
            fontWeight: '900',
            textAlign: 'center',
          },
        ]}
      />
    </View>
  );
};

export default Donut;
