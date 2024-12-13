use std::fs;
use std::io::Error;
use regex::Regex;

// Define a struct to represent an instruction
struct Instruction {
    opcode: String,
    operand1: u16,
    operand2: u16,
}

fn main() {
    // Read input file
    let instructions = read_input_file("input.txt").expect("error reading input file");

    // Extract uncorrupted mul(,) instructions from the input file
    let uncorrupted_mul_instructions = get_uncorrupted_mul_instructions(&instructions);

    // For each uncorrupted mul(,) instruction, calculate the product of the operands and sum them
    let mut sum: u32 = 0;
    for instruction in uncorrupted_mul_instructions {
        // print the instruction
        println!("Instruction: mul({}, {})", instruction.operand1, instruction.operand2);
        // Calculate the product of the operands if the opcode is mul
        if instruction.opcode != "mul" {
            continue;
        }
        let product = instruction.operand1 as u32 * instruction.operand2 as u32;
        sum += product;
    }

    // Print the sum of the products of the uncorrupted mul(,) instructions
    println!("Sum of the products of the uncorrupted mul(,) instructions: {}", sum);
}

// Function to read the input file
fn read_input_file(file_path: &str) -> Result<String, Error> {
    fs::read_to_string(file_path)
}

// Function to extract mul(,) instructions from the input file
fn get_uncorrupted_mul_instructions(instructions: &str) -> Vec<Instruction> {
    // Define regex pattern to match mul(,) instructions
    let re = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();
    
    // Iterate over the instructions and extract mul(,) instructions
    let mut uncorrupted_mul_instructions = Vec::new();

    for instruction in instructions.lines() {
        for caps in re.captures_iter(instruction) {
            let operand1 = caps.get(1).unwrap().as_str().parse::<u16>().unwrap();
            let operand2 = caps.get(2).unwrap().as_str().parse::<u16>().unwrap();
            let instruction = Instruction {
                opcode: "mul".to_string(),
                operand1,
                operand2,
            };
            uncorrupted_mul_instructions.push(instruction);
        }
    }

    uncorrupted_mul_instructions
}
