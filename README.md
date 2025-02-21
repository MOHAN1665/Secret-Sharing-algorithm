# Secret Sharing Algorithm

This repository implements a **Secret Sharing Algorithm** using **Barycentric Lagrange Interpolation** to reconstruct a secret constant (`c`) from given encoded values in JSON test case files.

## Table of Contents
- [Overview](#overview)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Example Test Case](#example-test-case)
- [Code Explanation](#code-explanation)
- [License](#license)

## Overview
This project reads encoded values from JSON files, decodes them based on their base, and reconstructs a secret constant (`c`) using **Barycentric Lagrange Interpolation**. It is useful for secret sharing schemes, where a secret can be recovered from a subset of shares.

## How It Works
1. The program reads a JSON file containing `n` encoded points.
2. It extracts `k` points required for reconstruction.
3. It decodes values using a helper function `decodeValue()`.
4. It applies **Barycentric Lagrange Interpolation** to compute the secret constant `c`.
5. The recovered constant is printed to the console.

## Project Structure
```
Secret-Sharing-Algorithm/
│── decoder.js            # Helper module for decoding values based on base
│── index.js              # Main script to process test cases
│── testcases.json        # Sample test case file
│── testcases2.json       # Another sample test case file
│── README.md             # Documentation
```

## Installation
Ensure you have **Node.js** installed. Then, clone the repository and install dependencies (if required).
```sh
git clone https://github.com/yourusername/Secret-Sharing-Algorithm.git
cd Secret-Sharing-Algorithm
npm install  # If any dependencies are required
```

## Usage
Run the script using:
```sh
node index.js
```
This will process the test cases (`testcases.json` and `testcases2.json`) and output the reconstructed secret constant.

## Example Test Case (`testcases.json`)
```json
{
  "keys": { "n": 5, "k": 3 },
  "1": { "base": 10, "value": "42" },
  "2": { "base": 16, "value": "2A" },
  "3": { "base": 8, "value": "52" },
  "4": { "base": 2, "value": "101010" }
}
```
### Expected Output
```
Secret constant (c) for testcases.json: <calculated_value>
Secret constant (c) for testcases2.json: <calculated_value>
```

## Code Explanation
- `readTestCase(filename)`: Reads and parses JSON test cases.
- `barycentricLagrangeInterpolation(points)`: Computes the secret using interpolation.
- `processTestCase(filename)`: Extracts `k` points, decodes values, and reconstructs `c`.
- `decodeValue(base, value)`: Converts values from different bases to decimal.

## License
This project is open-source and available under the **MIT License**.

