import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";

const App = () => {
  // Create shared values for scaling and position
  const scale = useSharedValue(1);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  // Gesture handler for pinch (scaling) gesture
  const pinchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      // Store the initial scale value
      ctx.scale = scale.value;
    },
    onActive: (event, ctx) => {
      // Update the scale value based on the gesture
      scale.value = event.scale * ctx.scale;
    },
  });

  // Gesture handler for pan (drag) gesture
  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      // Store the initial position
      ctx.translationX = positionX.value;
      ctx.translationY = positionY.value;
    },
    onActive: (event, ctx) => {
      // Update the position based on the gesture
      positionX.value = event.translationX + ctx.translationX;
      positionY.value = event.translationY + ctx.translationY;
    },
  });

  // Animated style for the red square
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={panHandler}
        minPointers={1}
        maxPointers={1}
      >
        <Animated.View style={{ flex: 1 }}>
          <PinchGestureHandler
            onGestureEvent={pinchHandler}
            minPointers={2}
            maxPointers={2}
          >
            <Animated.View style={{ justifyContent: "center", flex: 1 }}>
              <Animated.View
                style={[
                  {
                    width: 100,
                    height: 100,
                    backgroundColor: "red",
                    alignSelf: "center",
                  },
                  animatedStyle,
                ]}
              />
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default App;
