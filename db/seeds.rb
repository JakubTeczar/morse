Letter.destroy_all
Word.destroy_all

Letter.create!([
  {
    letter: "a",
    morse_code: ".-"
  },
  {
    letter: "b",
    morse_code: "-..."
  },
  {
    letter: "c",
    morse_code: "-.-."
  },
  {
    letter: "d",
    morse_code: "-.."
  },
  {
    letter: "e",
    morse_code: "."
  },
  {
    letter: "f",
    morse_code: "..-."
  },
  {
    letter: "g",
    morse_code: "--."
  },
  {
    letter: "h",
    morse_code: "...."
  },
  {
    letter: "i",
    morse_code: ".."
  },
  {
    letter: "j",
    morse_code: ".---"
  },
  {
    letter: "k",
    morse_code: "-.-"
  },
  {
    letter: "l",
    morse_code: ".-.."
  },
  {
    letter: "m",
    morse_code: "--"
  },
  {
    letter: "n",
    morse_code: "-."
  },
  {
    letter: "o",
    morse_code: "---"
  },
  {
    letter: "p",
    morse_code: ".--."
  },
  {
    letter: "q",
    morse_code: "--.-"
  },
  {
    letter: "r",
    morse_code: ".-."
  },
  {
    letter: "s",
    morse_code: "..."
  },
  {
    letter: "t",
    morse_code: "-"
  },
  {
    letter: "u",
    morse_code: "..-"
  },
  {
    letter: "v",
    morse_code: "...-"
  },
  {
    letter: "w",
    morse_code: ".--"
  },
  {
    letter: "x",
    morse_code: "-..-"
  },
  {
    letter: "y",
    morse_code: "-.--"
  },
  {
    letter: "z",
    morse_code: "--.."
  },
  {
    letter: "1",
    morse_code: ".----"
  },
  {
    letter: "2",
    morse_code: "..---"
  },
  {
    letter: "3",
    morse_code: "...--"
  },
  {
    letter: "4",
    morse_code: "....-"
  },
  {
    letter: "5",
    morse_code: "....."
  },
  {
    letter: "6",
    morse_code: "-...."
  },
  {
    letter: "7",
    morse_code: "--..."
  },
  {
    letter: "8",
    morse_code: "---.."
  },
  {
    letter: "9",
    morse_code: "----."
  },
  {
    letter: "0",
    morse_code: "-----"
  },
  {
    letter: ".",
    morse_code: ".-.-.-"
  },
  {
    letter: ",",
    morse_code: "--..--"
  },
  {
    letter: "?",
    morse_code: "..--.."
  },
  {
    letter: "'",
    morse_code: ".----."
  },
  {
    letter: "!",
    morse_code: "-.-.--"
  },
  {
    letter: "/",
    morse_code: "-..-."
  },
  {
    letter: "(",
    morse_code: "-.--."
  },
  {
    letter: ")",
    morse_code: "-.--.-"
  },
  {
    letter: "&",
    morse_code: ".-..."
  },
  {
    letter: ":",
    morse_code: "---..."
  },
  {
    letter: ";",
    morse_code: "-.-.-."
  },
  {
    letter: "=",
    morse_code: "-...-"
  },
  {
    letter: "+",
    morse_code: ".-.-."
  },
  {
    letter: "-",
    morse_code: "-....-"
  },
  {
    letter: "_",
    morse_code: "..--.-"
  },
  {
    letter: '"',
    morse_code: ".-..-."
  },
  {
    letter: "$",
    morse_code: "...-..-"
  },
  {
    letter: "@",
    morse_code: ".--.-."
  }
])

Word.create!([
  { word: "hello" },
  { word: "world" },
  { word: "time" },
  { word: "year" },
  { word: "people" },
  { word: "way" },
  { word: "day" },
  { word: "man" },
  { word: "thing" },
  { word: "woman" },
  { word: "life" },
  { word: "child" },
  { word: "world" },
  { word: "school" },
  { word: "state" },
  { word: "family" },
  { word: "student" },
  { word: "group" },
  { word: "country" },
  { word: "problem" },
  { word: "hand" },
  { word: "part" }
])