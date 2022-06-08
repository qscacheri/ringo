export const scale = (
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;
  return ((value - inputMin) * outputRange) / inputRange + outputMin;
};
