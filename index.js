const fs = require("fs"); // Import the File System module to read files
const { decodeValue } = require("./decoder"); // Import a function to decode values based on their base

// Function to read and parse the JSON test case file
function readTestCase(filename) {
  try {
    // Read the file content as a string and parse it as JSON
    const data = fs.readFileSync(filename, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    process.exit(1); // Exit the program if file reading fails
  }
}

// Function to find the secret constant 'c' using Barycentric Lagrange Interpolation
function barycentricLagrangeInterpolation(points) {
  let weights = new Array(points.length).fill(1); // Initialize weights for interpolation

  // Step 1: Precompute the Lagrange weights
  // This ensures that we don’t recompute the denominators multiple times.
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        weights[i] /= points[i].x - points[j].x; // Compute weight based on x values
      }
    }
  }

  // Step 2: Compute the interpolated value at x = 0 (which gives us the secret constant)
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < points.length; i++) {
    let term = weights[i] / points[i].x; // Compute the fraction for interpolation
    numerator += term * points[i].y; // Accumulate weighted sum of y-values
    denominator += term; // Accumulate the denominator
  }

  return Math.round(numerator / denominator); // Compute the final interpolated value
}

// Function to process each test case and find the secret constant
function processTestCase(filename) {
  const testCase = readTestCase(filename); // Load test case data
  const { n, k } = testCase.keys; // Extract 'n' (total points) and 'k' (threshold)

  // Check if there are enough points to reconstruct the polynomial
  if (n < k) {
    console.error("Not enough points to solve the polynomial!");
    return;
  }

  let points = [];
  let count = 0;

  // Extract the first 'k' points to reconstruct the polynomial
  for (const key in testCase) {
    if (key !== "keys" && count < k) {
      let x = parseInt(key); // Convert key (index) to an integer
      let base = parseInt(testCase[key].base); // Get the base of the value
      let value = testCase[key].value; // Get the encoded value
      let y = decodeValue(base, value); // Convert the value to decimal

      points.push({ x, y }); // Store the (x, y) pair
      count++; // Keep track of how many points we've added
    }
  }

  // Compute the secret constant using Barycentric Lagrange Interpolation
  const constantTerm = barycentricLagrangeInterpolation(points);
  console.log(`Secret constant (c) for ${filename}:`, constantTerm);
}

// Run the process for two test case files
processTestCase("testcases.json"); // Process the first test case
processTestCase("testcases2.json"); // Process the second test case (if needed)
