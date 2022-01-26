// Linear time algorithm

export const countOccurrences = (code: string, target: string) => {
  const result = [];
  let rowIndex = 0;
  let colIndex = 0;
  let i = 0; // generic variable for iterating through the code string

  while (i < code.length) {
    // Reset colIndex to 0 when a newline is encountered
    if (code[i] === "\n") {
      rowIndex++;
      colIndex = 0;
      i++;
      continue;
    }

    const currentChar = code[i];
    const previousChar = code[i - 1];

    // Criteria for beginning a rigorous check:
    //    - current character is the first character of the target AND
    //    - previous character is not a word character (letter or number) or dash
    //    - OR previous character is undefined => current character is at the start of a line
    if (
      currentChar === target[0] &&
      (!previousChar || !/\w|-/.test(previousChar))
    ) {
      let k = 0;
      while (k < target.length) {
        const checkingChar = code[i + k];
        const nextChar = code[i + k + 1];

        if (checkingChar !== target[k]) {
          k++;
          break;
        }

        // Criteria for passing a rigorous check:
        //    - all characters of the substring are checked and they match the target
        //    - next character is not a word character (letter or number) or dash
        //    - OR next character is undefined => last character is at the end of a line
        if (k === target.length - 1 && (!nextChar || !/\w|-/.test(nextChar))) {
          result.push([rowIndex, colIndex]);
        }
        k++;
      }
      i += k; // So we don't repeat the work we did during the rigorous check, loop skips ahead
      colIndex += k;
    } else {
      // In the case we didn't do a rigorous check, just increment
      i++;
      colIndex++;
    }
  }
  return result;
};

// Tests:

// Expected: [[0, 6], [2, 2], [2, 10], [3, 9]] - (4) matches
console.log(
  countOccurrences(
    "const count = 0\nfunction get_count(){\n  count = count + 1\n  return count\n}",
    "count"
  )
);

// Expected: [[1, 4], [1, 14], [4, 0]] - (3) matches
console.log(
  countOccurrences(
    "const coco = 3\nlet coconut = coconut + 1\ncoconut2 = big_coconut\ncoconut3\ncoconut",
    "coconut"
  )
);

// Expected: [[0, 6], [0, 11], [0, 14], [2, 0], [3,0], [3,12]] - (6) matches
console.log(
  countOccurrences(
    "const x = {x: x}\ny = xx + x1\nx = 2x + x_x\nx = xet_x + x",
    "x"
  )
);

// Expected: [] - (0) matches
console.log(
  countOccurrences(
    "const x2 = {x_3: 3x}\ny = xx + x1\nnx = 2x + x_x\nx0 = xet_x + x2",
    "x"
  )
);

// Expected: [[0, 30], [2,13], [3,17]] - (3) matches
console.log(
  countOccurrences(
    "The tools that exist for them to manage their\nwork are either reactive, inflexible, or stale.\nThey resolve to rotating schedules of\ndashboard-sweeps to catch important\nmoments and reference poorly-maintained\nGoogle Docs for process management.\nAvenue is the first tool custom-built for modern\noperations teams powered by all a company's\ndata across all their systems.",
    "to"
  )
);

// Expected: [[0, 6]] - (1) match
console.log(
  countOccurrences(
    "Hello there up-there-you up-there there-you! therm",
    "there"
  )
);
