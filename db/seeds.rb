Letter.destroy_all
Word.destroy_all

Letter.create!([
  {
    letter: "e",
    morse_code: "."
  },
  {
    letter: "i",
    morse_code: ".."
  },
  {
    letter: "a",
    morse_code: ".-"
  },
  {
    letter: "t",
    morse_code: "-"
  },
  {
    letter: "n",
    morse_code: "-."
  },
  {
    letter: "m",
    morse_code: "--"
  },
  {
    letter: "s",
    morse_code: "..."
  },
  {
    letter: "o",
    morse_code: "---"
  },
  {
    letter: "h",
    morse_code: "...."
  },
  {
    letter: "u",
    morse_code: "..-"
  },
  {
    letter: "r",
    morse_code: ".-."
  },
  {
    letter: "d",
    morse_code: "-.."
  },
  {
    letter: "l",
    morse_code: ".-.."
  },
  {
    letter: "f",
    morse_code: "..-."
  },
  {
    letter: "c",
    morse_code: "-.-."
  },
  {
    letter: "p",
    morse_code: ".--."
  },
  {
    letter: "g",
    morse_code: "--."
  },
  {
    letter: "w",
    morse_code: ".--"
  },
  {
    letter: "y",
    morse_code: "-.--"
  },
  {
    letter: "b",
    morse_code: "-..."
  },
  {
    letter: "v",
    morse_code: "...-"
  },
  {
    letter: "k",
    morse_code: "-.-"
  },
  {
    letter: "x",
    morse_code: "-..-"
  },
  {
    letter: "j",
    morse_code: ".---"
  },
  {
    letter: "z",
    morse_code: "--.."
  },
  {
    letter: "q",
    morse_code: "--.-"
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
  }
])

Word.create!([
  {
    word: "THE",
    level: 1
  },
  {
    word: "GET",
    level: 1
  },
  {
    word: "EAT",
    level: 1
  },
  {
    word: "TEA",
    level: 1
  },
  {
    word: "SET",
    level: 1
  },
  {
    word: "SEE",
    level: 1
  },
  {
    word: "MAIN",
    level: 2
  },
  {
    word: "MEAN",
    level: 2
  },
  {
    word: "NAME",
    level: 2
  },
  {
    word: "ANIMAL",
    level: 2
  },
  {
    word: "MAN",
    level: 2
  },
  {
    word: "IN",
    level: 2
  },
  {
    word: "SO",
    level: 3
  },
  {
    word: "SOON",
    level: 3
  },
  {
    word: "US",
    level: 3
  },
  {
    word: "HIS",
    level: 3
  },
  {
    word: "HAS",
    level: 3
  },
  {
    word: "OUR",
    level: 3
  },
  {
    word: "SHE",
    level: 3
  },
  {
    word: "SUCH",
    level: 3
  },
  {
    word: "HER",
    level: 4
  },
  {
    word: "OLD",
    level: 4
  },
  {
    word: "LORD",
    level: 4
  },
  {
    word: "HERD",
    level: 4
  },
  {
    word: "REAL",
    level: 4
  },
  {
    word: "RED",
    level: 4
  },
  {
    word: "HELD",
    level: 4
  },
  {
    word: "ROLL",
    level: 4
  },
  {
    word: "GROW",
    level: 5
  },
  {
    word: "NOW",
    level: 5
  },
  {
    word: "LOW",
    level: 5
  },
  {
    word: "COLD",
    level: 5
  },
  {
    word: "HOLD",
    level: 5
  },
  {
    word: "WORD",
    level: 5
  },
  {
    word: "GLOW",
    level: 5
  },
  {
    word: "WORK",
    level: 5
  },
  {
    word: "BY",
    level: 6
  },
  {
    word: "KEY",
    level: 6
  },
  {
    word: "VERY",
    level: 6
  },
  {
    word: "BE",
    level: 6
  },
  {
    word: "BOY",
    level: 6
  },
  {
    word: "BOOK",
    level: 6
  },
  {
    word: "BACK",
    level: 6
  },
  {
    word: "KNOW",
    level: 6
  },
  {
    word: "JOB",
    level: 7
  },
  {
    word: "BOX",
    level: 7
  },
  {
    word: "JAZZ",
    level: 7
  },
  {
    word: "ZOO",
    level: 7
  },
  {
    word: "ZERO",
    level: 7
  },
  {
    word: "JOY",
    level: 7
  },
  {
    word: "JUDGE",
    level: 7
  },
  {
    word: "QUICK",
    level: 7
  }
])