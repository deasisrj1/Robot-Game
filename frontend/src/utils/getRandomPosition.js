/**
 * getRandomPosition - creates a random number from 0 to the range upTo
 * excluding numbers that are in the array of numbers from without
 * @param {*} upTo - range of number we want to find
 * @param {*} without - numbers to exclude from random number generator
 * @returns
 */
const getRandomPosition = (upTo, without = []) => {
  const numbers = Array(upTo)
    .fill()
    .map((_, index) => index)
    .filter((num) => !without.includes(num));
  return numbers[Math.floor(Math.random() * numbers.length)];
};

export default getRandomPosition;
