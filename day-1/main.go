package main

import (
	"fmt"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func read_file() string {
	// read input.txt
	content, err := os.ReadFile("input.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return ""
	}

	return string(content)
}

// parse the content of the file into two arrays
// the content is two columns of numbers separated by multiple spaces.
// split the content by newlines and then split each line by spaces.
// in each row, the first number goes in array 1, and the second number goes in array 2.
// then the arrays are sorted in ascending order.
func parse_content(content string) ([]int, []int) {
	// split by newlines
	lines := strings.Split(content, "\n")

	// define the two arrays
	var arr1 []int
	var arr2 []int

	// split by spaces
	for _, line := range lines {
		numbers := strings.Split(line, "   ")

		// check if the line has two numbers
		if len(numbers) != 2 {
			continue
		}
		// convert to int and append to arrays
		num1, err := strconv.Atoi(numbers[0])
		if err != nil {
			continue
		}
		num2, err := strconv.Atoi(numbers[1])
		if err != nil {
			continue
		}
		arr1 = append(arr1, num1)
		arr2 = append(arr2, num2)
	}

	// sort the arrays
	sort.Ints(arr1)
	sort.Ints(arr2)

	// return the arrays
	return arr1, arr2
}

func calculate_differences(arr1 []int, arr2 []int) int {
	// calculate the differences between the two arrays
	// the differences are the sum of the absolute values of the differences between the two arrays
	// the differences are calculated by subtracting the first array from the second array

	// check if the arrays are the same length

	if len(arr1) != len(arr2) {
		return -1
	}

	// calculate the differences
	differences := 0
	for i := 0; i < len(arr1); i++ {
		differences += int(math.Abs(float64(arr1[i] - arr2[i])))
	}

	return differences
}

func calculate_similarity(arr1 []int, arr2 []int) int {
	// calculate the similarity between the two arrays
	// the similarity is the occurrence of each number in arr1 in arr2
	// so for example, if 3 is in arr1, and 3 is in arr2, then the similarity is 1
	// if 3 is in arr1, and 3 is not in arr2, then the similarity is 0
	// if 3 is in arr1 twice, and 3 is in arr2 once, then the similarity is 1
	// if 3 is in arr1, and 3 is in arr2 twice, then the similarity is 6 (3*2)
	// if 3 is in arr1 twice, and 3 is in arr2 twice, then the similarity is 6 (3*2 + 3*2)

	// check if the arrays are the same length
	if len(arr1) != len(arr2) {
		return -1
	}

	// calculate the similarities
	similarity := 0
	for i := 0; i < len(arr1); i++ {
		// get the next number in arr1
		num := arr1[i]

		// check how many times the number occurs in arr2
		count := 0
		for j := 0; j < len(arr2); j++ {
			if arr2[j] == num {
				count++
			}
		}

		// add the similarity to the total
		similarity += num * count
	}

	return similarity
}

func main() {
	// get file content into a variable
	content := read_file()

	// parse the content into two arrays
	arr1, arr2 := parse_content(content)

	// calculate the differences between the two arrays
	differences := calculate_differences(arr1, arr2)

	fmt.Println("Differences:", differences)

	// calculate the similarity between the two arrays
	similarity := calculate_similarity(arr1, arr2)

	fmt.Println("Similarity:", similarity)
}
