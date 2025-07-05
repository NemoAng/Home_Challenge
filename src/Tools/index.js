function getTwoUniqueNumbersFromArray(length: number = 20): [number, number] {
  // 1. Create an array of numbers from 1 to 20
  //    Array.from creates an array; (_, i) => i + 1 populates it with 1, 2, ..., 20.
  const numbers = Array.from({ length: 20 }, (_, i) => i); // [1, 2, ..., 20]

  // 2. Create a mutable copy of the array
  //    We use the spread syntax (...) to avoid modifying the original 'numbers' array.
  const availableNumbers = [...numbers];

  // 3. Pick the first random number
  const randomIndex1 = Math.floor(Math.random() * availableNumbers.length); // Get a random index
  const number1 = availableNumbers[randomIndex1]; // Get the number at that index

  // 4. Remove the first chosen number from the 'availableNumbers' array
  //    This is crucial to ensure the second pick is different.
  availableNumbers.splice(randomIndex1, 1); // Remove 1 element starting from randomIndex1

  // 5. Pick the second random number from the remaining numbers
  const randomIndex2 = Math.floor(Math.random() * availableNumbers.length); // Get a new random index
  const number2 = availableNumbers[randomIndex2]; // Get the second unique number

  // console.log("Original Array:", numbers);
  // console.log("Picked two unique numbers:", number1, "and", number2);

  return [number1, number2];
}
export default getTwoUniqueNumbersFromArray;