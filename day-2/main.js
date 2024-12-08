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
    // Set the original direction by looking at the first and second digit
    let isIncreasing = digits[0] < digits[1];
    // Iterate through the digits, check for each digit if matches the original direction, and checking if the difference is between bounds
    for (let i = 1; i < digits.length; i++) {
        if (isIncreasing) {
            if (!(digits[i] > digits[i - 1] && digits[i] - digits[i - 1] <= 3)) {
                return false;
            }
        }
        else {
            if (!(digits[i] < digits[i - 1] && digits[i - 1] - digits[i] <= 3)) {
                return false;
            }
        }
    }
    return true;
}
// Function to solve the problem
function solve(input) {
    let safeReports = input.filter(isSafe);
    console.log(safeReports.length);
}
// Call the solve function with the input
solve(input);
