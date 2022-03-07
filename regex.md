# Regex ! 

. = any one character

\* = any number of the last character (including zero!)

&#92;+ = any number of the last character (starting from 1)

^ = matches the beggining of a line

$ = matches the end of a line

&#92;s  = any whitespace character

&#92;S = matches any non-whitespace character

&#92;? = Preceding character is optional

[a-z] = any lowercase character

[A-Z] = any UPPERCASE character

[A-Za-z] = upper or lowercase character

[0-9] = any number

&#92;w = matches a word

&#92;b = matches words boundaries (first and last character)

&#92;B = matches a non-word boundary

# sed

```bash
sed -i # Modify the input file with the output
sed "s/c/C/g" file.txt #s for substitute (c for C), /g means global BY LINE
sed "s/\s*#.*//g" file.txt #removes comments and whitespaces before it
sed "s/\s*#.*//g; /alias/ d" file.txt # d stands for DELETE, p would stand for PRINT, q would QUIT after first occurence is found. Important to note that you can do mutiple operations using the ; symbol
sed "/^$/ d" file.txt # this will remove any empty line (^$)


```



## Grep

```bash
grep "fax" file.txt # Finds every instances of "fax" in the "sedtry" file
grep "f.x" file.txt # Finds every instances of "f_x" in the "sedtry" file
grep "https\?" file.txt # preceding character is optional
grep "https\?://[a-z]*[\.][a-z]\+\S*" file.txt # Example of a URL regexp (imperfect)
grep "\S\+@\S\+\.[A-Za-z]\+" file.txt # Example of a email regexp

```

### Reference

wiki <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions>

summary: <https://www.youtube.com/watch?v=77I4ZkhuHsQ>

with sed: <https://www.youtube.com/watch?v=QaGhpqRll_k>

