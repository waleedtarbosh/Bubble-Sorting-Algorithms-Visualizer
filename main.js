const arrayLengthInput = document.getElementById('arrayLength');
const randomizeBtn = document.getElementById('randomizeBtn');
const solveBtn = document.getElementById('solveBtn');
const barsDiv = document.getElementById('bars');
const arrayLengthValue = document.getElementById('arrayLengthValue');

// Add event listener to update value display
arrayLengthInput.addEventListener('input', () => {
  arrayLengthValue.textContent = arrayLengthInput.value;
});


//This function generates an array of random numbers between 0 and 100 
function generateArray(length) {
    const arr = [];
    const used = new Set(); // keep track of used numbers
    while (arr.length < length) {
      const num = Math.floor(Math.random() * 101); // generates a random number between 0 and 100
      if (!used.has(num)) { // check if number has not been used
        arr.push(num);
        used.add(num); // add number to used set
      }
    }
    return arr;
  }
  
  
//This function takes an array and updates the visualization container to display the bar chart of the array.
function visualizeArray(arr) {
    barsDiv.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = `${arr[i]}px`;
      bar.innerText = arr[i]; 
      barsDiv.appendChild(bar);
    }
  }

// Sorts an array using the bubble sort algorithm, and updates the visualization container for each iteration
// of the algorithm using setInterval. Each swap is visually displayed by updating the bar chart gradually over time.
function bubbleSort(arr) {
    let swapped;
    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= arr.length - 1) {
        clearInterval(intervalId);
        return;
      }
      swapped = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
          visualizeArray(arr);
        }
      }
      i++;
    }, 100);
  }
  
  
  
//When the randomize button is clicked, the script generates an array of random numbers and updates the visualization container.
randomizeBtn.addEventListener('click', () => {
  const length = parseInt(arrayLengthInput.value);
  const arr = generateArray(length);
  visualizeArray(arr);
});


//When the solve button is clicked, the script extracts the height of each bar in the visualization container and passes it to the bubbleSort function to sort the array.
solveBtn.addEventListener('click', () => {
  const bars = barsDiv.querySelectorAll('.bar');
  const arr = Array.from(bars).map(bar => parseInt(bar.style.height));
  bubbleSort(arr);
});
