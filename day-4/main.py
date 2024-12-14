from typing import List, Tuple

def is_out_of_bounds(map: List[str], coords: Tuple[int, int]) -> bool:
    return coords[0] >= len(map) or coords[1] >= len(map[0]) or coords[0] < 0 or coords[1] < 0

def count_words_from_coords(map: List[str], initial_coords: Tuple[int, int], word: str) -> int:
    # check if the current position is out of bounds
    if is_out_of_bounds(map, initial_coords):
        return 0
    
    if map[initial_coords[0]][initial_coords[1]] != word[0]:
        # if the current letter is not the first letter of the word, return 0
        return 0
    
    full_words = 0

    directions = [(1, 0), (1,1), (0,1), (-1,1), (-1,0), (-1,-1), (0,-1), (1,-1)]

    for direction in directions:
        next_coords = (initial_coords[0] + direction[0], initial_coords[1] + direction[1])
        for i, letter in enumerate(word[1:], 1):
            if is_out_of_bounds(map, next_coords):
                break
            if map[next_coords[0]][next_coords[1]] != letter:
                # print(f"Letter: {letter}, Coords: {next_coords}")
                break
            # print(f"Letter: {letter}, Coords: {next_coords}")
            next_coords = (next_coords[0] + direction[0], next_coords[1] + direction[1])
        else:
            full_words += 1
        
    return full_words

def is_x_shaped_mas_on_coords(map: List[str], initial_coords: Tuple[int, int]) -> bool:
    # check if the current position and neighbouring fields in an X pattern are out of bounds
    lower_right_coords = (initial_coords[0] + 1, initial_coords[1] + 1)
    lower_left_coords = (initial_coords[0] + 1, initial_coords[1] - 1)
    upper_left_coords = (initial_coords[0] - 1, initial_coords[1] - 1)
    upper_right_coords = (initial_coords[0] - 1, initial_coords[1] + 1)

    x_coords = [lower_right_coords, lower_left_coords, upper_left_coords, upper_right_coords]

    if is_out_of_bounds(map, initial_coords) or any([is_out_of_bounds(map, coords) for coords in x_coords]):
        return False
    
    if map[initial_coords[0]][initial_coords[1]] != "A":
        # if the current letter is not the central "A" of the MAS, return 0
        return False

    # if the letters across from each other match, it can't be a X-MAS
    if map[lower_right_coords[0]][lower_right_coords[1]] == map[upper_left_coords[0]][upper_left_coords[1]]:
        return False

    # if otherwise, if there are 2-2 M and S letters in the corners, it is a X-MAS
    letters = [map[x][y] for x, y in x_coords]

    return letters.count("M") == 2 and letters.count("S") == 2


def main(word="XMAS"):
    # read input.txt file into a list of strings
    with open("input.txt") as file:
        map = file.read().splitlines()

    count = 0
    for i, line in enumerate(map):
        for j, letter in enumerate(line):
            count += count_words_from_coords(map, (j, i), word)

    print(count)

    x_shaped_mas_count = 0
    for i, line in enumerate(map):
        for j, letter in enumerate(line):
            if is_x_shaped_mas_on_coords(map, (j, i)):
                x_shaped_mas_count += 1

    print(x_shaped_mas_count)
            
    

if __name__ == "__main__":
    main()