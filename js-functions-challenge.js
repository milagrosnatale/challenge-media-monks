// import fetch from "node-fetch";
function arrayPosition(array) {
  // Return the fifth item of the array received as parameter
  return array[4];
}

function arraySize(array) {
  // Return the size of the array received as parameter
  return array.length;
}

function arrayChange(array) {
  // Receive an array of numbers and return an array with the same numbers, but as strings.
  return array.map((array) => array.toString());
}

let frase = "today I woke up";
function loopConditional(string, element) {
  // This function must return the number of times the element appears in the string received
  // Example: String: "today I woke up" element: "o" result: 2
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i].toLowerCase() === element.toLowerCase()) {
      count++;
    }
  }
  return (
    "The element: " + element + ", appears in the string: " + count + " times."
  );
}

async function objectData(url) {
  // This function should be able to do the following:
  // 1) Capture the information from the url received as parameter (JSON file)
  //  1.1) url to be used as test: https://storage.googleapis.com/mm-tse-latam/orders.json
  // 2) Write a code that can verify the value of all products, and:
  // 3) Return the NAME of the product with the highest price.
  // p.s.: (The NAME of the product is the 'product' parameter of the JSON file)
  // let response = await
  try {
    let response = await fetch(url);
    let data = await response.json();
    let highestPrice = 0;
    let highestPricedProduct = "";
    for (let product of data.orders) {
      if (product.total > highestPrice) {
        highestPrice = product.total;
        highestPricedProduct = product.product;
      }
    }
    return highestPricedProduct;
  } catch (error) {
    console.log(error);
  }
}

function calculateTotalTimePhoneCalls(phoneCallsLogs) {
  // This function should receive an array of phone calls (in minutes) and the output should be an array of objects, with the sum of minutes for each person. Use hours when possible as the example above. If minutes < 60 use hours = 0
  // Sample phoneCallLogs: [["Manuel", 10],["Maria", 25],["Manuel", 30],["Manuel", 40],["Juan", 30],["Maria", 10],["Maria", 20],["Eduardo", 15],["Manuel", 45],["Maria", 150],["Eduardo", 30]] // minutes
  // Sample expected output: [{"name":"Manuel","hours":2,"minutes":5},{"name":"Maria","hours":3,"minutes":25},{"name":"Juan","hours":0,"minutes":30},{"name":"Eduardo","hours":0,"minutes":45}]
  const summary = {};
  for (let call of phoneCallsLogs) {
    if (!summary[call[0]]) {
      summary[call[0]] = {
        minutes: call[1],
        hours: 0,
      };
    } else {
      summary[call[0]].minutes += call[1];
    }
    if (summary[call[0]].minutes >= 60) {
      summary[call[0]].hours = Math.floor(summary[call[0]].minutes / 60);
      summary[call[0]].minutes = summary[call[0]].minutes % 60;
    }
  }
  return Object.entries(summary).map(([name, data]) => ({
    name,
    hours: data.hours,
    minutes: data.minutes,
  }));
}

function sortTotalTimePhoneCalls(callsLogsGroupByName) {
  // This function should receive the output array of the previous function and return the same array sorted in descending order by hours and minutes.
  // Sample input: [{"name":"Manuel","hours":2,"minutes":5},{"name":"Maria","hours":3,"minutes":25},{"name":"Juan","hours":0,"minutes":30},{"name":"Eduardo","hours":0,"minutes":45}]
  // Sample expected output: [{"name":"Maria","hours":3,"minutes":25},{"name":"Manuel","hours":2,"minutes":5},{"name":"Eduardo","hours":0,"minutes":45},{"name":"Juan","hours":0,"minutes":30}]
  callsLogsGroupByName.sort((a, b) => {
    if (a.hours < b.hours) {
      return 1;
    }
    if (a.hours > b.hours) {
      return -1;
    }
    if (a.minutes < b.minutes) {
      return 1;
    }
    if (a.minutes > b.minutes) {
      return -1;
    }
    return 0;
  });
  console.log(callsLogsGroupByName);
}

function variablesFromText(text) {
  // This function should receive a string that can contain GTM Variables with format {{variable}}
  // The output should be an array containing all the variables from the text. If there are no variables, return empty array
  // Sample input: "The URL is: {{js path}} :: {{js query parameters}} :: {{js hash}}"
  // Sample output: [{{js path}}, {{js query parameters}}, {{js hash}}]
  // Sample input: "The item {{item name}} has a price of {{item price}} and there are {{item quantity}} units in stock"
  // Sample output: [{{item name}}, {{item price}}, {{item quantity}}]
  const regex = /{{([^}]+)}}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text))) {
    variables.push(match[0]);
  }
  return variables;
}

module.exports = {
  arrayPosition,
  arraySize,
  arrayChange,
  loopConditional,
  objectData,
  calculateTotalTimePhoneCalls,
  sortTotalTimePhoneCalls,
  variablesFromText,
};
