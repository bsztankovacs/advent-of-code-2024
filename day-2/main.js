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
// Function to check if the report is safe. 
// Accepts a string and if the report is safe, returns true, otherwise false and the index of the unsafe digit
function isSequenceSafe(digits) {
    // Split the report string, convert to integers
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
    let unsafeIndex = -1;
    // Iterate through the digits, check for each digit if matches the original direction, and checking if the difference is between bounds
    for (let i = 1; i < digits.length; i++) {
        let wasSafeStep = ifSafeStep(digits[i - 1], digits[i]);
        if (!wasSafeStep) {
            unsafeIndex = i;
            return [false, unsafeIndex];
        }
    }
    return [true, unsafeIndex];
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
function isReportSafe(report) {
    let reportDigits = report.split(' ').map(Number);
    let [isReportSafe, unsafeIndex] = isSequenceSafe(reportDigits);
    if (isReportSafe) {
        return true;
    }
    // If the report is not safe, create a new report with the unsafe digit removed - two options
    // Create a deep copy of the report
    let reportDigits2 = reportDigits.slice();
    let reportDigits1 = reportDigits.slice();
    // Remove the unsafe digit
    reportDigits1.splice(unsafeIndex, 1);
    reportDigits2.splice(unsafeIndex - 1, 1);
    // Check if the corrected report is safe
    let [isCorrectedReportSafe1] = isSequenceSafe(reportDigits1);
    let [isCorrectedReportSafe2] = isSequenceSafe(reportDigits2);
    return isCorrectedReportSafe1 || isCorrectedReportSafe2;
}
// Function to solve the problem
function solve(input) {
    let safeReports = input.filter(isReportSafe);
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
        console.log(isReportSafe(line));
    });
}
// Call the solve function with the input
solve(input);
// manualTest();
