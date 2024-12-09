"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// Read input txt file
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
// Function to check if the report is safe, accepts a string and returns a boolean
function isSafe(report) {
    // Split the report string, convert to integers
    const digits = report.split(' ').map(Number);
    let problemDampener = 0;
    let isIncreasing;
    // Check the first four digits to determine the direction of the sequence. If there is more asc than desc, the sequence is increasing
    let ascCount = 0;
    let descCount = 0;
    for (let i = 1; i < 4; i++) {
        if (digits[i] > digits[i - 1]) {
            ascCount++;
        }
        else if (digits[i] < digits[i - 1]) {
            descCount++;
        }
    }
    isIncreasing = ascCount > descCount;
    // Iterate through the digits, check for each digit if matches the original direction, and checking if the difference is between bounds
    for (let i = 1; i < digits.length; i++) {
        let wasSafeStep = ifSafeStep(digits[i - 1], digits[i]);
        if (!wasSafeStep) {
            console.log('Not safe step, because direction:', isIncreasing, 'digits:', digits[i - 1], digits[i]);
            if (problemDampener > 0) {
                return false;
            }
            // check if the following digit is safe as well
            if (i + 1 < digits.length) {
                // check if the following digit is safe with the first or the second digit of the current pair
                let isSafeWithFirstNum = ifSafeStep(digits[i - 1], digits[i + 1]);
                let isSafeWithSecondNum = ifSafeStep(digits[i], digits[i + 1]);
                if (!isSafeWithFirstNum && !isSafeWithSecondNum) {
                    return false;
                }
                // replace the second digit with the first digit if it is safe
                if (isSafeWithFirstNum) {
                    digits[i] = digits[i - 1];
                }
            }
            problemDampener++;
        }
        if (problemDampener > 1) {
            return false;
        }
    }
    console.log('Safe report:', report);
    return true;
    function ifSafeStep(firstNum, secondNum) {
        if (isIncreasing) {
            if (!(secondNum > firstNum && secondNum - firstNum <= 3)) {
                return false;
            }
        }
        else {
            if (!(secondNum < firstNum && firstNum - secondNum <= 3)) {
                return false;
            }
        }
        return true;
    }
}
// Function to solve the problem
function solve(input) {
    let safeReports = input.filter(isSafe);
    console.log(safeReports.length);
}
// Function for manual testing, which listens on the console and calls the solve function with the input
function manualTest() {
    // Listen on the console
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // for each line, call the solve function with the input
    readline.on('line', (line) => {
        console.log(isSafe(line));
    });
}
// Call the solve function with the input
// solve(input);
manualTest();
