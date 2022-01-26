# count-occurrences

Algorithm to calculate the row and column of the occurences of a variable within a string of code.

Example:

```javascript
countOccurrences(
    "const count = 0\nfunction get_count(){\n  count = count + 1\n  return count\n}",
    "count"
  )
  // Expected return value: [[0, 6], [2, 2], [2, 10], [3, 9]]
```
