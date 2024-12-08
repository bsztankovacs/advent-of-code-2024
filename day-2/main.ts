import * as fs from 'fs';

// Read input txt file
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

// Function to check if the report is safe, accepts a string and returns a boolean
function isSafe(report: string): boolean {
    // Split the report string, convert to integers
    const digits = report.split(' ').map(Number);

    // Set the original direction by looking at the first and second digit
    let isIncreasing = digits[0] < digits[1];

    // Iterate through the digits, check for each digit if matches the original direction, and checking if the difference is between bounds
    for (let i = 1; i < digits.length; i++) {
        if (isIncreasing) {
            if (!(digits[i] > digits[i - 1] && digits[i] - digits[i - 1] <= 3)) {
                return false;
            }
            
        } else {
            if (!(digits[i] < digits[i - 1] && digits[i - 1] - digits[i] <= 3)) {
                return false;
            }
        }
    }
    return true;
}

// Function to solve the problem
function solve(input: string[]): void {
    let safeReports = input.filter(isSafe);
    console.log(safeReports.length);
}

// Call the solve function with the input
solve(input);