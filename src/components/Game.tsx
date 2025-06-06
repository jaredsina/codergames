import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import { GameState, Question } from '../types';
import React from 'react';

type Category = 'Python' | 'Scratch' | 'HTML/CSS/Javascript' | 'Round 2';
type Difficulty = 'easy' | 'medium' | 'hard';

const questionsByCategory: Record<Category, Record<Difficulty, Question[]>> = {
  'Python': {
    'easy': [
      {
        "id": 1,
        "type": "implement",
        "content": "Which line correctly prints 'Hello, world!' in Python?",
        "correctAnswer": "print('Hello, world!')",
        "choices": [
          "System.out.println('Hello, world!')",
          "console.log('Hello, world!')",
          "print('Hello, world!')",
          "echo 'Hello, world!'"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 2,
        "type": "implement",
        "content": "How do you create a variable named `age` with the value 13?",
        "correctAnswer": "age = 13",
        "choices": [
          "age := 13",
          "int age = 13",
          "age = 13",
          "let age = 13"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 3,
        "type": "implement",
        "content": "What is the correct way to start a function in Python?",
        "correctAnswer": "def my_function():",
        "choices": [
          "function my_function()",
          "def my_function():",
          "func my_function()",
          "function: my_function()"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 4,
        "type": "implement",
        "content": "Which symbol is used for comments in Python?",
        "correctAnswer": "#",
        "choices": [
          "//",
          "/*",
          "#",
          "<!--"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 5,
        "type": "implement",
        "content": "Which data type would you use to store a name like 'Alice'?",
        "correctAnswer": "String",
        "choices": [
          "Boolean",
          "String",
          "Integer",
          "Float"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 6,
        "type": "implement",
        "content": "Which operator is used to check if two values are equal?",
        "correctAnswer": "==",
        "choices": [
          "=",
          "==",
          "===",
          "!="
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 7,
        "type": "implement",
        "content": "What will this code print: `print(2 + 3 * 4)`?",
        "correctAnswer": "14",
        "choices": [
          "20",
          "14",
          "24",
          "9"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 8,
        "type": "implement",
        "content": "Which of these is a correct list in Python?",
        "correctAnswer": "[1, 2, 3]",
        "choices": [
          "[1, 2, 3]",
          "{1, 2, 3}",
          "(1, 2, 3)",
          "<1, 2, 3>"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 9,
        "type": "implement",
        "content": "How do you start a while loop in Python?",
        "correctAnswer": "while condition:",
        "choices": [
          "while (condition)",
          "repeat until condition",
          "while condition:",
          "loop while condition"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      },
      {
        "id": 10,
        "type": "implement",
        "content": "Which one of these is a boolean value in Python?",
        "correctAnswer": "True",
        "choices": [
          "Yes",
          "TRUE",
          "1",
          "True"
        ],
        "points": 5,
        "timeLimit": 30,
        "category": "Python",
        "difficulty": "easy"
      }
    ],
    'medium': [
      {
        "id": 11,
        "type": "implement",
        "content": "What is the output of this code?\n\nx = [1, 2, 3]\nprint(x[-1])\n",
        "correctAnswer": "3",
        "choices": ["3", "1", "2", "IndexError"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 12,
        "type": "implement",
        "content": "What does this code print?\n\nfor i in range(1, 4):\n    print(i * '*')",
        "correctAnswer": "*\n**\n***",
        "choices": ["*\n**\n***", "*\n*\n*", "***", "SyntaxError"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 13,
        "type": "implement",
        "content": "What is the correct way to open a file for reading in Python?",
        "correctAnswer": "open('file.txt', 'r')",
        "choices": ["open('file.txt')", "open('file.txt', 'w')", "open('file.txt', 'r')", "file.open('file.txt')"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 14,
        "type": "implement",
        "content": "Which built-in function returns the length of a list?",
        "correctAnswer": "len()",
        "choices": ["count()", "length()", "len()", "size()"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 15,
        "type": "implement",
        "content": "What is the output of:\n\nx = [1, 2, 3]\nx.append([4, 5])\nprint(x)\n",
        "correctAnswer": "[1, 2, 3, [4, 5]]",
        "choices": ["[1, 2, 3, 4, 5]", "[1, 2, 3, [4, 5]]", "[1, 2, 3, 4]", "[1, 2, 3]"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 16,
        "type": "implement",
        "content": "What is the result of `bool('False')`?",
        "correctAnswer": "True",
        "choices": ["False", "Error", "None", "True"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 17,
        "type": "implement",
        "content": "How do you define a class named `Dog` in Python?",
        "correctAnswer": "class Dog:",
        "choices": ["class Dog:", "define class Dog", "Dog() class", "def Dog():"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 18,
        "type": "implement",
        "content": "Which of the following creates a dictionary in Python?",
        "correctAnswer": "{'a': 1, 'b': 2}",
        "choices": ["['a', 'b']", "{'a': 1, 'b': 2}", "('a', 1, 'b', 2)", "{1, 2, 3}"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 19,
        "type": "implement",
        "content": "Which statement correctly checks if key `'name'` exists in a dictionary `d`?",
        "correctAnswer": "'name' in d",
        "choices": ["d.has('name')", "'name' in d", "d['name']", "exists(d, 'name')"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      },
      {
        "id": 20,
        "type": "implement",
        "content": "What does this function return?\n\ndef mystery(a):\n    return a[::-1]\n\nWhat will `mystery('abc')` return?",
        "correctAnswer": "'cba'",
        "choices": ["['c', 'b', 'a']", "'abc'", "'cba'", "None"],
        "points": 10,
        "timeLimit": 45,
        "category": "Python",
        "difficulty": "medium"
      }
    ],
    'hard': [
      {
        "id": 21,
        "type": "implement",
        "content": "What is the output?\n\ndef func(a, b=[]):\n    b.append(a)\n    return b\n\nprint(func(1))\nprint(func(2))",
        "correctAnswer": "[1]\n[1, 2]",
        "choices": ["[1]\n[1, 2]", "[1]\n[2]", "[1, 2]\n[1, 2]", "[1]\n[1]"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 22,
        "type": "implement",
        "content": "What is the output of this code?\n\nx = [1, 2, 3]\ny = x\nx[0] = 99\nprint(y)\n",
        "correctAnswer": "[99, 2, 3]",
        "choices": ["[99, 2, 3]", "[1, 2, 3]", "[0, 2, 3]", "Error"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 23,
        "type": "implement",
        "content": "Which of these will raise a `TypeError`?",
        "correctAnswer": "`{[1]: 'one'}`",
        "choices": ["`{(1,): 'one'}`", "`{1: 'one'}`", "`{[1]: 'one'}`", "`{'1': 'one'}`"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 24,
        "type": "implement",
        "content": "What is the output?\n\nx = (i*i for i in range(3))\nprint(list(x))\nprint(list(x))\n",
        "correctAnswer": "[0, 1, 4]\n[]",
        "choices": ["[0, 1, 4]\n[]", "[0, 1, 4]\n[0, 1, 4]", "[0, 1, 4]\nNone", "Error"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 25,
        "type": "implement",
        "content": "What does this code return?\n\nprint(''.join(sorted('cab')))\n",
        "correctAnswer": "abc",
        "choices": ["abc", "cab", "bac", "None"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 26,
        "type": "implement",
        "content": "What is the output?\n\ndef foo(x, y):\n    return x if x > y else y\nprint(foo(3, 5))",
        "correctAnswer": "5",
        "choices": ["3", "5", "True", "None"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 27,
        "type": "implement",
        "content": "Which method is used to get all keys in a dictionary?",
        "correctAnswer": "keys()",
        "choices": ["keys()", "getKeys()", "all()", "dict()"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 28,
        "type": "implement",
        "content": "What is the result of:\n\nprint(0.1 + 0.2 == 0.3)\n",
        "correctAnswer": "False",
        "choices": ["False", "True", "0.3", "Error"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 29,
        "type": "implement",
        "content": "What will be printed?\n\nx = [1, 2, 3]\nprint(x.pop(1))\nprint(x)\n",
        "correctAnswer": "2\n[1, 3]",
        "choices": ["2\n[1, 3]", "1\n[2, 3]", "3\n[1, 2]", "[1, 2]"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      },
      {
        "id": 30,
        "type": "implement",
        "content": "What is the output?\n\ndef add_items(a, b=[]):\n    b.append(a)\n    return b\n\nprint(add_items(1))\nprint(add_items(2))",
        "correctAnswer": "[1]\n[1, 2]",
        "choices": ["[1]\n[1, 2]", "[1, 2]\n[2]", "[2]\n[2]", "[1]\n[2]"],
        "points": 15,
        "timeLimit": 60,
        "category": "Python",
        "difficulty": "hard"
      }
    ]
  },
  'Scratch': {
    'easy': [
  {
    "id": 31,
    "type": "implement",
    "content": "Which block starts the project when the green flag is clicked?",
    "correctAnswer": "when green flag clicked",
    "choices": ["when I receive message", "when green flag clicked", "forever", "when space key pressed"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 32,
    "type": "implement",
    "content": "Which block is used to move a sprite forward?",
    "correctAnswer": "move 10 steps",
    "choices": ["go to x: y:", "glide 1 secs to x: y:", "move 10 steps", "change x by 10"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 33,
    "type": "implement",
    "content": "What type of block is used to repeat actions forever?",
    "correctAnswer": "forever",
    "choices": ["wait 1 seconds", "forever", "repeat 10", "if then"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 34,
    "type": "implement",
    "content": "Which block shows text on the screen for a short time?",
    "correctAnswer": "say 'Hello!' for 2 seconds",
    "choices": ["broadcast message", "say 'Hello!' for 2 seconds", "think 'Hmm...'", "wait 2 seconds"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 35,
    "type": "implement",
    "content": "Which category has blocks like 'move', 'turn', and 'go to'?",
    "correctAnswer": "Motion",
    "choices": ["Events", "Motion", "Control", "Looks"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 36,
    "type": "implement",
    "content": "Which block changes the sprite's costume?",
    "correctAnswer": "next costume",
    "choices": ["change color effect by 25", "go to front layer", "next costume", "switch backdrop to"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 37,
    "type": "implement",
    "content": "Which block do you use to check if two values are equal?",
    "correctAnswer": "=",
    "choices": ["=", "and", "<", ">"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 38,
    "type": "implement",
    "content": "What happens when you use the 'go to x: y:' block?",
    "correctAnswer": "The sprite jumps to a new location instantly",
    "choices": ["The sprite rotates", "The sprite jumps to a new location instantly", "The sprite disappears", "The sprite moves slowly to the new spot"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 39,
    "type": "implement",
    "content": "Which block will make the sprite wait before doing something?",
    "correctAnswer": "wait 1 seconds",
    "choices": ["broadcast message", "wait 1 seconds", "forever", "stop all"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  },
  {
    "id": 40,
    "type": "implement",
    "content": "Which block starts a script when you press a key?",
    "correctAnswer": "when space key pressed",
    "choices": ["when green flag clicked", "if then", "repeat until", "when space key pressed"],
    "points": 5,
    "timeLimit": 30,
    "category": "Scratch",
    "difficulty": "easy"
  }
    ],
    'medium': [
      {
        "id": 41,
        "content": "Which block would you use to continuously check if the sprite is touching the edge?",
        "correctAnswer": "forever",
        "choices": ["repeat", "if then", "forever", "wait until"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 42,
        "content": "What block combination would you use to make a sprite bounce when hitting the edge?",
        "correctAnswer": "if on edge, bounce",
        "choices": ["go to x: y:", "if then", "if on edge, bounce", "touching edge?"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 43,
        "content": "Which blocks would you combine to make a sprite move randomly on the screen?",
        "correctAnswer": "go to x: (pick random -240 to 240) y: (pick random -180 to 180)",
        "choices": ["glide to random position", "change x by 10", "go to x: (pick random -240 to 240) y: (pick random -180 to 180)", "move 10 steps"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 44,
        "content": "Which block do you use to check both conditions at once?",
        "correctAnswer": "and",
        "choices": ["or", "=", "not", "and"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 45,
        "content": "What block do you use to store a value that can be changed later?",
        "correctAnswer": "make a variable",
        "choices": ["set size to", "make a variable", "if then", "when I receive"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 46,
        "content": "Which block can detect whether a key is being pressed?",
        "correctAnswer": "key (space) pressed?",
        "choices": ["when key pressed", "mouse down?", "key (space) pressed?", "touching color?"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 47,
        "content": "What does the 'broadcast' block do in Scratch?",
        "correctAnswer": "Sends a message to start other scripts",
        "choices": ["Saves the game", "Sends a message to start other scripts", "Changes the costume", "Moves the sprite to another layer"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 48,
        "content": "Which control block would you use to repeat actions until a condition is true?",
        "correctAnswer": "repeat until",
        "choices": ["forever", "repeat until", "if then", "wait until"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 49,
        "content": "Which sensing block lets the sprite detect another sprite?",
        "correctAnswer": "touching (sprite)?",
        "choices": ["distance to (sprite)", "touching (sprite)?", "ask and wait", "mouse x"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 50,
        "content": "Which block would you use to change the value of a variable?",
        "correctAnswer": "change [variable] by 1",
        "choices": ["set size to 100%", "change [variable] by 1", "show variable", "repeat"],
        "points": 10,
        "timeLimit": 45,
        "category": "Scratch",
        "difficulty": "medium",
        "type": "implement"
      }
    ],
    'hard': [
      {
        "id": 51,
        "content": "How can you create a timer that resets when a sprite is clicked?",
        "correctAnswer": "Reset timer in the 'when this sprite clicked' block",
        "choices": ["Broadcast 'reset' message", "Change timer by -timer", "Reset timer in the 'when this sprite clicked' block", "Set variable 'timer' to 0 in forever loop"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 52,
        "content": "What is the best way to detect a collision between two moving sprites in Scratch?",
        "correctAnswer": "Use 'touching [sprite]?' sensing block",
        "choices": ["Compare x and y positions", "Use broadcast between sprites", "Use 'touching [sprite]?' sensing block", "Set variable to sprite name"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 53,
        "content": "Which combination of blocks would allow you to make a sprite follow the mouse only when the mouse button is held down?",
        "correctAnswer": "Use 'if mouse down?' with 'point towards mouse-pointer' and 'move'",
        "choices": ["Use 'forever' and 'mouse x/y'", "Broadcast on mouse click", "Use 'if mouse down?' with 'point towards mouse-pointer' and 'move'", "Use 'glide to mouse-pointer'"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 54,
        "content": "How would you keep a score from increasing multiple times when two sprites touch continuously?",
        "correctAnswer": "Use a variable as a flag to allow only one score increase per touch",
        "choices": ["Add a 'wait' block after score", "Broadcast after scoring", "Use a variable as a flag to allow only one score increase per touch", "Check touching only once per loop"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 55,
        "content": "How do you make a sprite gradually fade out?",
        "correctAnswer": "Use 'change ghost effect by 10' in a loop",
        "choices": ["Use 'hide'", "Use 'change brightness by -10'", "Use 'change ghost effect by 10' in a loop", "Set costume to transparent"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 56,
        "content": "What approach would you use to build a custom high score system that saves between game sessions?",
        "correctAnswer": "Use the cloud variable feature for storing high scores",
        "choices": ["Use broadcast to share score", "Use global variable", "Use the cloud variable feature for storing high scores", "Ask player to write it down"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 57,
        "content": "How can you create a clone that behaves differently depending on when it was created?",
        "correctAnswer": "Use a variable or list to track clone data at creation",
        "choices": ["Use a broadcast", "Assign random motion", "Use a variable or list to track clone data at creation", "Clones cannot behave differently"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 58,
        "content": "Which block would you use to create a custom block with its own set of instructions?",
        "correctAnswer": "Make a block (My Blocks category)",
        "choices": ["Define variable", "Make a block (My Blocks category)", "Broadcast and wait", "Create function"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 59,
        "content": "What is the best way to manage enemy waves appearing over time in a game?",
        "correctAnswer": "Use a loop with 'create clone' and 'wait' blocks",
        "choices": ["Set number of clones at start", "Use one sprite per enemy", "Use a loop with 'create clone' and 'wait' blocks", "Change costume repeatedly"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 60,
        "content": "What technique allows you to simulate gravity for a jumping sprite?",
        "correctAnswer": "Use a velocity variable and change y position each frame",
        "choices": ["Glide to ground", "Point in direction 180", "Use a velocity variable and change y position each frame", "Use broadcast 'fall'"],
        "points": 15,
        "timeLimit": 60,
        "category": "Scratch",
        "difficulty": "hard",
        "type": "implement"
      }
    ]
  },
  'HTML/CSS/Javascript': {
    'easy': [
  {
    "id": 61,
    "content": "Which HTML tag is used to create a hyperlink?",
    "correctAnswer": "<a>",
    "choices": ["<link>", "<a>", "<href>", "<hyperlink>"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 62,
    "content": "What CSS property changes the background color of an element?",
    "correctAnswer": "background-color",
    "choices": ["color", "background-color", "bgcolor", "background"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 63,
    "content": "Which HTML tag is used to define the main heading on a webpage?",
    "correctAnswer": "<h1>",
    "choices": ["<head>", "<h1>", "<header>", "<title>"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 64,
    "content": "How do you add a comment in JavaScript?",
    "correctAnswer": "// This is a comment",
    "choices": ["<!-- comment -->", "// This is a comment", "# This is a comment", "/* comment */"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 65,
    "content": "Which CSS property controls the text size?",
    "correctAnswer": "font-size",
    "choices": ["text-size", "font-style", "font-size", "text-style"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 66,
    "content": "Which JavaScript function outputs a message to the web console?",
    "correctAnswer": "console.log()",
    "choices": ["alert()", "console.log()", "print()", "write()"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 67,
    "content": "In HTML, what attribute is used to specify an image URL?",
    "correctAnswer": "src",
    "choices": ["href", "src", "link", "url"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 68,
    "content": "How do you select an element with the id 'header' in CSS?",
    "correctAnswer": "#header",
    "choices": [".header", "#header", "header", "*header"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 69,
    "content": "Which tag is used to add JavaScript code inside an HTML file?",
    "correctAnswer": "<script>",
    "choices": ["<js>", "<javascript>", "<script>", "<code>"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 70,
    "content": "How do you make text bold using HTML?",
    "correctAnswer": "<b>",
    "choices": ["<bold>", "<b>", "<strong>", "<font-weight>"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 201,
    "content": "Which HTML tag is used for the largest heading?",
    "correctAnswer": "<h1>",
    "choices": ["<h1>", "<heading>", "<head>", "<h6>"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 202,
    "content": "What is the correct HTML element for inserting a line break?",
    "correctAnswer": "<br>",
    "choices": ["<break>", "<br>", "<lb>", "<newline>"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 203,
    "content": "Which CSS property is used to change the text color of an element?",
    "correctAnswer": "color",
    "choices": ["color", "text-color", "font-color", "background-color"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 204,
    "content": "How do you write 'Hello World' in an alert box in JavaScript?",
    "correctAnswer": "alert('Hello World');",
    "choices": ["alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 205,
    "content": "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    "correctAnswer": "alt",
    "choices": ["alt", "title", "src", "longdesc"],
    "points": 5,
    "timeLimit": 30,
    "category": "HTML/CSS/Javascript",
    "difficulty": "easy",
    "type": "implement"
  }
],
    'medium': [
      {
        "id": 71,
        "content": "Which CSS rule would make all <p> elements have blue text?",
        "correctAnswer": "p { color: blue; }",
        "choices": ["p { text-color: blue; }", "p.color = blue;", "p { color: blue; }", "<p style='blue'>"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 72,
        "content": "What will the following JavaScript code output?\n`console.log(2 + '2');`",
        "correctAnswer": "'22'",
        "choices": ["'22'", "4", "NaN", "undefined"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 73,
        "content": "How do you correctly link a CSS file in HTML?",
        "correctAnswer": "<link rel=\"stylesheet\" href=\"style.css\">",
        "choices": ["<css>style.css</css>", "<link src=\"style.css\">", "<link rel=\"stylesheet\" href=\"style.css\">", "<style src='style.css'>"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 74,
        "content": "Which JavaScript keyword is used to declare a variable that can be reassigned?",
        "correctAnswer": "let",
        "choices": ["const", "let", "var", "reassign"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 75,
        "content": "What does 'display: flex;' do in CSS?",
        "correctAnswer": "Enables flexible layout for child elements",
        "choices": ["Adds spacing", "Hides the element", "Enables flexible layout for child elements", "Applies grid layout"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 76,
        "content": "What is the output of:\n`let x = 5;\nconsole.log(++x);`",
        "correctAnswer": "6",
        "choices": ["5", "6", "x", "undefined"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 77,
        "content": "Which of the following is a valid CSS class selector?",
        "correctAnswer": ".myClass",
        "choices": [".myClass", "#myClass", "myClass()", "<class='myClass'>"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 78,
        "content": "Which method adds an item to the end of a JavaScript array?",
        "correctAnswer": "push()",
        "choices": ["append()", "push()", "addToEnd()", "insert()"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 79,
        "content": "What does the `alt` attribute in an <img> tag provide?",
        "correctAnswer": "Text description if the image doesn't load",
        "choices": ["Image size", "Text description if the image doesn't load", "A tooltip", "URL of the image"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 80,
        "content": "How can you make a function in JavaScript?",
        "correctAnswer": "function myFunction() {}",
        "choices": ["function:myFunction{}", "function myFunction() {}", "myFunction = function[]", "make function myFunction()"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 104,
        "content": "Which CSS property is used to change the font of an element?",
        "correctAnswer": "font-family",
        "choices": ["font-family", "font-type", "font-style", "font-weight"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 105,
        "content": "What is the output of: console.log(typeof null);?",
        "correctAnswer": "object",
        "choices": ["object", "null", "undefined", "string"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 106,
        "content": "Which HTML tag is used to create an unordered list?",
        "correctAnswer": "<ul>",
        "choices": ["<ol>", "<ul>", "<li>", "<list>"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 206,
        "content": "Which JavaScript method is used to select an element by its ID?",
        "correctAnswer": "document.getElementById()",
        "choices": ["document.getElementById()", "document.querySelector()", "document.getElement()", "document.selectById()"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 207,
        "content": "Which CSS property is used to change the spacing between letters?",
        "correctAnswer": "letter-spacing",
        "choices": ["letter-spacing", "word-spacing", "spacing", "font-spacing"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 208,
        "content": "How do you add a comment in CSS?",
        "correctAnswer": "/* comment */",
        "choices": ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 209,
        "content": "Which HTML tag is used to define a table row?",
        "correctAnswer": "<tr>",
        "choices": ["<td>", "<tr>", "<th>", "<row>"],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 210,
        "content": "What is the correct JavaScript syntax to change the content of the HTML element below?\n\n<p id=\"demo\">This is a demonstration.</p>",
        "correctAnswer": "document.getElementById('demo').innerHTML = 'Hello World!';",
        "choices": [
          "document.getElementById('demo').innerHTML = 'Hello World!';",
          "#demo.innerHTML = 'Hello World!';",
          "document.getElement('demo').innerHTML = 'Hello World!';",
          "document.querySelector('demo').innerHTML = 'Hello World!';"
        ],
        "points": 5,
        "timeLimit": 45,
        "category": "HTML/CSS/Javascript",
        "difficulty": "medium",
        "type": "implement"
      }
    ],
    'hard': [
      {
        "id": 81,
        "content": "What is the difference between `==` and `===` in JavaScript?",
        "correctAnswer": "`===` checks both value and type, while `==` checks only value with type coercion.",
        "choices": [
          "`==` checks both value and type, `===` only checks value.",
          "`===` is only used in arrays.",
          "`===` checks both value and type, while `==` checks only value with type coercion.",
          "They are interchangeable."
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 82,
        "content": "What does `event.preventDefault()` do in JavaScript?",
        "correctAnswer": "Prevents the default behavior of the event from occurring",
        "choices": [
          "Cancels the event entirely",
          "Pauses the event handler",
          "Prevents the default behavior of the event from occurring",
          "Refreshes the page"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 83,
        "content": "How do you select all `<div>` elements inside a `<section>` using CSS?",
        "correctAnswer": "section div",
        "choices": [
          "section > div > *",
          "div section",
          "section div",
          "div.section"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 84,
        "content": "What will `typeof NaN` return in JavaScript?",
        "correctAnswer": "\"number\"",
        "choices": [
          "\"undefined\"",
          "\"number\"",
          "\"NaN\"",
          "\"object\""
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 85,
        "content": "How can you center a `<div>` horizontally using CSS Flexbox?",
        "correctAnswer": "Use `display: flex; justify-content: center;` on the parent",
        "choices": [
          "Set margin: auto on the child",
          "Use `text-align: center` on the child",
          "Use `display: flex; justify-content: center;` on the parent",
          "Use `float: center;`"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 86,
        "content": "Which HTML element is best for wrapping a group of related form fields?",
        "correctAnswer": "<fieldset>",
        "choices": [
          "<div>",
          "<form>",
          "<fieldset>",
          "<label>"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 87,
        "content": "What does `this` refer to in a regular JavaScript function?",
        "correctAnswer": "The object that called the function",
        "choices": [
          "Always the global object",
          "The object that called the function",
          "The parent function",
          "The DOM element"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 88,
        "content": "What is the default position value in CSS?",
        "correctAnswer": "static",
        "choices": [
          "absolute",
          "static",
          "relative",
          "fixed"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 89,
        "content": "What will `console.log([] + {})` print in JavaScript?",
        "correctAnswer": "'[object Object]'",
        "choices": [
          "'{}[]'",
          "'[object Object]'",
          "NaN",
          "undefined"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 90,
        "content": "Which CSS property controls the stacking order of elements?",
        "correctAnswer": "z-index",
        "choices": [
          "z-layer",
          "position",
          "z-index",
          "stack"
        ],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 107,
        "content": "What will this code output?\n\nconsole.log([1,2,3] + [4,5,6]);",
        "correctAnswer": "1,2,34,5,6",
        "choices": ["[1,2,3,4,5,6]", "1,2,34,5,6", "[1,2,3]+[4,5,6]", "Error"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 108,
        "content": "Which CSS property allows you to create rounded corners?",
        "correctAnswer": "border-radius",
        "choices": ["border-radius", "corner-radius", "round-corner", "radius"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 109,
        "content": "What does the 'defer' attribute do in a <script> tag?",
        "correctAnswer": "It delays script execution until after the HTML is parsed.",
        "choices": ["It runs the script immediately.", "It delays script execution until after the HTML is parsed.", "It loads the script asynchronously.", "It disables the script."],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 110,
        "content": "What is the result of: [1,2,3].map(x => x * 2).filter(x => x > 3)?",
        "correctAnswer": "[4, 6]",
        "choices": ["[2, 4, 6]", "[4, 6]", "[6]", "[2, 6]"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 211,
        "content": "What is the output of the following code?\n\nconsole.log(typeof NaN);",
        "correctAnswer": "number",
        "choices": ["number", "NaN", "undefined", "object"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 212,
        "content": "Which HTML5 element is used to specify a footer for a document or section?",
        "correctAnswer": "<footer>",
        "choices": ["<footer>", "<bottom>", "<section-footer>", "<foot>"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 213,
        "content": "Which CSS property is used to create a shadow effect for text?",
        "correctAnswer": "text-shadow",
        "choices": ["box-shadow", "text-shadow", "shadow", "font-shadow"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 214,
        "content": "What is the result of the following code?\n\nconsole.log(0 == false);",
        "correctAnswer": "true",
        "choices": ["true", "false", "TypeError", "undefined"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      },
      {
        "id": 215,
        "content": "Which JavaScript method can be used to convert a JSON string into a JavaScript object?",
        "correctAnswer": "JSON.parse()",
        "choices": ["JSON.parse()", "JSON.stringify()", "parseJSON()", "toObject()"],
        "points": 15,
        "timeLimit": 60,
        "category": "HTML/CSS/Javascript",
        "difficulty": "hard",
        "type": "implement"
      }
    ]
  },
  'Round 2': {
    'easy': [
  {
    "id": 235,
    "content": "Which coding concept would you use to store a player's name in your program?",
    "correctAnswer": "Variables",
    "choices": ["Functions", "Variables", "Loops", "Comments"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 216,
    "content": "You want to repeat the same action 10 times. Which concept should you use?",
    "correctAnswer": "Loops",
    "choices": ["If statements", "Variables", "Loops", "Functions"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 217,
    "content": "Which of these is the correct way to write a comment in most programming languages?",
    "correctAnswer": "// This is a comment",
    "choices": ["This is a comment", "// This is a comment", "This is a comment //", "comment: This is a comment"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 218,
    "content": "You need to check if a player's score is greater than 100 to award a bonus. What do you need?",
    "correctAnswer": "An if statement",
    "choices": ["A loop", "A variable", "An if statement", "A function"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 219,
    "content": "What data type would be best for storing whether a player has completed a level?",
    "correctAnswer": "Boolean",
    "choices": ["String", "Integer", "Boolean", "Float"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 220,
    "content": "Which concept allows you to group related code together and reuse it multiple times?",
    "correctAnswer": "Functions",
    "choices": ["Variables", "Functions", "Comments", "Data types"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 221,
    "content": "You want to store the numbers 1, 2, 3, 4, 5 together. What should you use?",
    "correctAnswer": "An array/list",
    "choices": ["Five separate variables", "An array/list", "A boolean", "A comment"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 222,
    "content": "What will this code likely do: while health > 0:",
    "correctAnswer": "Keep running as long as health is above 0",
    "choices": ["Set health to 0", "Keep running as long as health is above 0", "Run exactly once", "Never run"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 223,
    "content": "Which data type is best for storing a player's age?",
    "correctAnswer": "Integer",
    "choices": ["String", "Boolean", "Integer", "Array"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 224,
    "content": "You want to display different messages based on a player's level (beginner, intermediate, advanced). What's the best approach?",
    "correctAnswer": "Use multiple if statements",
    "choices": ["Use multiple if statements", "Use a loop", "Use only variables", "Use comments"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 225,
    "content": "What does 'debugging' mean in programming?",
    "correctAnswer": "Finding and fixing errors",
    "choices": ["Adding new features", "Finding and fixing errors", "Writing comments", "Creating variables"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 226,
    "content": "Which symbol is commonly used for assignment in most programming languages?",
    "correctAnswer": "=",
    "choices": ["==", "=", "!=", "<>"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 227,
    "content": "You need to go through each item in a shopping list and print it. What concept do you need?",
    "correctAnswer": "A loop",
    "choices": ["Variables only", "Functions only", "A loop", "Comments"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 228,
    "content": "What's the difference between = and == in most programming languages?",
    "correctAnswer": "= assigns a value, == compares values",
    "choices": ["No difference", "= assigns a value, == compares values", "= compares values, == assigns a value", "Both are used for comments"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 229,
    "content": "Which concept would help you organize code for different types of game characters (player, enemy, NPC)?",
    "correctAnswer": "Classes/Objects",
    "choices": ["Variables", "Classes/Objects", "Comments", "Loops"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 230,
    "content": "What data type would you use to store a player's username?",
    "correctAnswer": "String",
    "choices": ["Integer", "Boolean", "String", "Float"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 231,
    "content": "You want to create a block of code that calculates tax and use it in multiple places. What should you create?",
    "correctAnswer": "A function",
    "choices": ["A variable", "A comment", "A function", "A loop"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 232,
    "content": "Which of these represents a condition in programming?",
    "correctAnswer": "x == 5",
    "choices": ["x = 5", "x == 5", "// x is 5", "print(x)"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 233,
    "content": "What happens in an infinite loop?",
    "correctAnswer": "The code runs forever",
    "choices": ["The code runs forever", "The code runs once", "The code never runs", "The code produces an error immediately"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  },
  {
    "id": 234,
    "content": "You need to store information about a car (make, model, year, color). What's the best approach?",
    "correctAnswer": "An object/class with properties",
    "choices": ["Separate variables for each piece of information", "One string with all information", "An object/class with properties", "Multiple arrays"],
    "points": 5,
    "timeLimit": 30,
    "category": "Round 2",
    "difficulty": "easy",
    "type": "implement"
  }
],
    'medium': [],
    'hard': [
      {
        "id": 236,
        "content": "What is the time complexity of searching for an element in an unsorted array?",
        "correctAnswer": "O(n)",
        "choices": ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 237,
        "content": "Which data structure follows the Last In, First Out (LIFO) principle?",
        "correctAnswer": "Stack",
        "choices": ["Queue", "Stack", "Array", "Linked List"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 238,
        "content": "What will happen if you try to access an array element beyond its bounds in most programming languages?",
        "correctAnswer": "Runtime error or undefined behavior",
        "choices": ["Returns null", "Returns the last element", "Runtime error or undefined behavior", "Creates a new element"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 239,
        "content": "In object-oriented programming, what does 'inheritance' allow you to do?",
        "correctAnswer": "Create new classes based on existing classes",
        "choices": ["Share variables between functions", "Create new classes based on existing classes", "Access private variables", "Combine multiple files"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 240,
        "content": "What is the difference between pass-by-value and pass-by-reference?",
        "correctAnswer": "Pass-by-value copies the data, pass-by-reference passes the memory address",
        "choices": ["No difference", "Pass-by-value copies the data, pass-by-reference passes the memory address", "Pass-by-value is faster", "Pass-by-reference copies the data"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 241,
        "content": "Which sorting algorithm has the best average-case time complexity?",
        "correctAnswer": "Merge Sort",
        "choices": ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 242,
        "content": "What is recursion in programming?",
        "correctAnswer": "A function that calls itself",
        "choices": ["A loop that runs indefinitely", "A function that calls itself", "Multiple functions calling each other", "Reusing code in different files"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 243,
        "content": "In a binary search tree, what is true about the left child of any node?",
        "correctAnswer": "It is smaller than the parent node",
        "choices": ["It is larger than the parent node", "It is smaller than the parent node", "It is always null", "It has no specific relationship"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 244,
        "content": "What is the purpose of exception handling in programming?",
        "correctAnswer": "To gracefully handle runtime errors",
        "choices": ["To prevent compilation errors", "To gracefully handle runtime errors", "To optimize code performance", "To debug syntax errors"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 245,
        "content": "Which of these is NOT a characteristic of object-oriented programming?",
        "correctAnswer": "Global state management",
        "choices": ["Encapsulation", "Inheritance", "Polymorphism", "Global state management"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 246,
        "content": "What is the main advantage of using a hash table?",
        "correctAnswer": "Fast average-case lookup time O(1)",
        "choices": ["Maintains sorted order", "Fast average-case lookup time O(1)", "Uses less memory", "Easier to implement"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 247,
        "content": "In database design, what does normalization help achieve?",
        "correctAnswer": "Reduces data redundancy and improves data integrity",
        "choices": ["Increases query speed", "Reduces data redundancy and improves data integrity", "Makes tables larger", "Simplifies database structure"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 248,
        "content": "What is the difference between a compiler and an interpreter?",
        "correctAnswer": "Compiler translates entire program before execution, interpreter executes line by line",
        "choices": ["No difference", "Compiler translates entire program before execution, interpreter executes line by line", "Compiler is faster to start", "Interpreter creates executable files"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 249,
        "content": "What is a deadlock in concurrent programming?",
        "correctAnswer": "When two or more processes wait indefinitely for each other",
        "choices": ["When a program stops responding", "When two or more processes wait indefinitely for each other", "When memory runs out", "When a loop runs forever"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 250,
        "content": "Which design pattern is used to ensure a class has only one instance?",
        "correctAnswer": "Singleton",
        "choices": ["Factory", "Observer", "Singleton", "Strategy"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 251,
        "content": "What is the space complexity of a recursive function that makes n recursive calls with each call using constant space?",
        "correctAnswer": "O(n)",
        "choices": ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 252,
        "content": "In version control systems like Git, what does 'merging' accomplish?",
        "correctAnswer": "Combines changes from different branches",
        "choices": ["Deletes old code", "Combines changes from different branches", "Creates a backup", "Uploads code to server"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 253,
        "content": "What is the primary purpose of unit testing?",
        "correctAnswer": "Test individual components in isolation",
        "choices": ["Test the entire application", "Test individual components in isolation", "Test user interface", "Test database connections"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 254,
        "content": "Which HTTP status code indicates a successful request?",
        "correctAnswer": "200",
        "choices": ["404", "500", "200", "301"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      },
      {
        "id": 255,
        "content": "What is the main difference between abstract classes and interfaces?",
        "correctAnswer": "Abstract classes can have implementation, interfaces cannot",
        "choices": ["No difference", "Abstract classes can have implementation, interfaces cannot", "Interfaces are faster", "Abstract classes are newer"],
        "points": 10,
        "timeLimit": 30,
        "category": "Round 2",
        "difficulty": "medium",
        "type": "implement"
      }
    ]
  }
};

const Game = () => {
  const navigate = useNavigate();
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [coachDiceResult, setCoachDiceResult] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [hasCoachHelp, setHasCoachHelp] = useState(false);
  const [hasRolledDifficulty, setHasRolledDifficulty] = useState(false);
  const [hasRolledCoach, setHasRolledCoach] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRollingDifficulty, setIsRollingDifficulty] = useState(false);
  const [isRollingCoach, setIsRollingCoach] = useState(false);

  const [gameState, setGameState] = useState<GameState>({
    category: localStorage.getItem('selectedCategory') as Category || 'Python',
    currentDifficulty: 'easy',
    currentQuestionIndex: 0,
    score: 0,
    showAnswer: null,
    timeLeft: 1800,
    usedQuestions: [],
    isBreak: false,
    mainTimeRemaining: 1800,
    mainTimerPaused: false
  });

  const currentQuestions = questionsByCategory[gameState.category]?.[gameState.currentDifficulty] || [];

  const getRandomUnusedQuestion = () => {
    // First check if we have questions for the current category and difficulty
    if (!currentQuestions || currentQuestions.length === 0) {
      // If no questions available, try to move to next difficulty
      if (gameState.currentDifficulty === 'easy') {
        setGameState(prev => ({
          ...prev,
          currentDifficulty: 'medium',
          currentQuestionIndex: 0,
          usedQuestions: []
        }));
        return 0;
      } else if (gameState.currentDifficulty === 'medium') {
        setGameState(prev => ({
          ...prev,
          currentDifficulty: 'hard',
          currentQuestionIndex: 0,
          usedQuestions: []
        }));
        return 0;
      } else {
        // If we've used all questions in all difficulties, end the game
        const storedTeams = localStorage.getItem('teams');
        if (storedTeams) {
          const teams = JSON.parse(storedTeams);
          if (teams.length > 0) {
            teams[0].score = gameState.score;
            localStorage.setItem('teams', JSON.stringify(teams));
          }
        }
        navigate('/leaderboard');
        return -1;
      }
    }

    const availableQuestions = currentQuestions.filter((_, index) => 
      !gameState.usedQuestions.includes(index)
    );
    
    if (availableQuestions.length === 0) {
      // If all questions in current difficulty are used, move to next difficulty
      if (gameState.currentDifficulty === 'easy') {
        setGameState(prev => ({
          ...prev,
          currentDifficulty: 'medium',
          currentQuestionIndex: 0,
          usedQuestions: []
        }));
        return 0;
      } else if (gameState.currentDifficulty === 'medium') {
        setGameState(prev => ({
          ...prev,
          currentDifficulty: 'hard',
          currentQuestionIndex: 0,
          usedQuestions: []
        }));
        return 0;
      } else {
        // If we've used all questions in all difficulties, end the game
        const storedTeams = localStorage.getItem('teams');
        if (storedTeams) {
          const teams = JSON.parse(storedTeams);
          if (teams.length > 0) {
            teams[0].score = gameState.score;
            localStorage.setItem('teams', JSON.stringify(teams));
          }
        }
        navigate('/leaderboard');
        return -1;
      }
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = currentQuestions.findIndex(q => q.id === availableQuestions[randomIndex].id);
    
    if (questionIndex === -1) {
      // If we couldn't find the question, reset and try again
      setGameState(prev => ({
        ...prev,
        usedQuestions: []
      }));
      return 0;
    }
    
    setGameState(prev => ({
      ...prev,
      usedQuestions: [...prev.usedQuestions, questionIndex]
    }));
    return questionIndex;
  };

  const rollDifficultyDice = () => {
    if (hasRolledDifficulty) return;
    setIsRollingDifficulty(true);
    setShowQuestion(false);
    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
    }, 100);

    // Stop rolling after 1 second
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalResult = Math.floor(Math.random() * 6) + 1;
      setDiceResult(finalResult);
      setIsRollingDifficulty(false);
      setHasRolledDifficulty(true);
      
      // Set difficulty based on dice roll
      let newDifficulty: Difficulty;
      if (finalResult <= 2) {
        newDifficulty = 'easy';
      } else if (finalResult <= 4) {
        newDifficulty = 'medium';
      } else {
        newDifficulty = 'hard';
      }
      setSelectedDifficulty(newDifficulty);
    }, 1000);
  };

  const rollCoachDice = () => {
    if (hasRolledCoach) return;
    setIsRollingCoach(true);
    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setCoachDiceResult(Math.floor(Math.random() * 10) + 1);
    }, 100);

    // Stop rolling after 1 second
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalResult = Math.floor(Math.random() * 10) + 1;
      setCoachDiceResult(finalResult);
      setIsRollingCoach(false);
      setHasRolledCoach(true);
      // Set coach help if coach dice is 1, 2, or 3 (30% chance)
      setHasCoachHelp(finalResult <= 3);
    }, 1000);
  };

  const handleContinue = () => {
    if (selectedDifficulty) {
      const newQuestionIndex = getRandomUnusedQuestion();
      if (newQuestionIndex >= 0) {  // Only update if we got a valid question index
        setGameState((prev: GameState) => ({
          ...prev,
          currentDifficulty: selectedDifficulty,
          currentQuestionIndex: newQuestionIndex
        }));
        setShowQuestion(true);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft > 0) {
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
          };
        } else {
          clearInterval(timer);
          if (prev.isBreak) {
            return {
              ...prev,
              isBreak: false,
              timeLeft: prev.mainTimeRemaining,
              mainTimerPaused: false,
            };
          } else {
            const storedTeams = localStorage.getItem('teams');
            if (storedTeams) {
              const teams = JSON.parse(storedTeams);
              if (teams.length > 0) {
                teams[0].score = prev.score;
                localStorage.setItem('teams', JSON.stringify(teams));
              }
            }
            navigate('/leaderboard');
            return prev;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCurrentPhase = () => {
    if (gameState.isBreak) return 'Break Time';
    return 'Coding Phase';
  };

  const handleSubmitAnswer = () => {
    if (currentAnswer.trim()) {
      const currentQuestion = currentQuestions[gameState.currentQuestionIndex];
      const isCorrect = currentAnswer.trim() === currentQuestion.correctAnswer;
      
      if (isCorrect) {
        setGameState(prev => ({
          ...prev,
          score: prev.score + currentQuestion.points
        }));
      }
      
      setCurrentAnswer('');
      setDiceResult(null);
      setCoachDiceResult(null);
      setShowQuestion(false);
      setSelectedDifficulty(null);
      setHasCoachHelp(false);
      setHasRolledDifficulty(false);
      setHasRolledCoach(false);
    }
  };

  const handleNextQuestion = () => {
    const newQuestionIndex = getRandomUnusedQuestion();
    if (newQuestionIndex >= 0) {  // Only update if we got a valid question index
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: newQuestionIndex
      }));
      setCurrentAnswer('');
      setDiceResult(null);
      setCoachDiceResult(null);
      setShowQuestion(false);
      setSelectedDifficulty(null);
      setHasCoachHelp(false);
      setHasRolledDifficulty(false);
      setHasRolledCoach(false);
    }
  };

  const handleStartBreak = () => {
    setGameState(prev => ({
      ...prev,
      isBreak: true,
      timeLeft: 300, // 5 minutes for break
      mainTimerPaused: true,
      mainTimeRemaining: prev.timeLeft,
    }));
  };

  const handleSkipBreak = () => {
    setGameState(prev => ({
      ...prev,
      isBreak: false,
      timeLeft: prev.mainTimeRemaining,
      mainTimerPaused: false,
    }));
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: '100%',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            maxWidth: 800,
            display: 'flex', 
            flexDirection: 'column',
            gap: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              CoderGames
            </Typography>
            <Typography variant="h6" color="primary">
              Points: {gameState.score}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="text.primary">
              {getCurrentPhase()}
            </Typography>
            <Typography variant="h4" align="center" gutterBottom color="text.primary">
              {formatTime(gameState.timeLeft)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(gameState.timeLeft / (gameState.isBreak ? 300 : 1800)) * 100}
              sx={{ 
                height: 10, 
                borderRadius: 5,
                bgcolor: 'secondary.light',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'primary.main',
                },
              }}
            />
          </Box>

          {gameState.isBreak ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3
            }}>
              <Typography variant="h6" gutterBottom color="text.primary">
                Take a 5-minute break!
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                {gameState.mainTimerPaused ? 
                  "Your test timer is paused. Take some time to stretch and refresh." :
                  "You're halfway through the test. Take some time to stretch and refresh."}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSkipBreak}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Skip Break
              </Button>
            </Box>
          ) : isRollingDifficulty || isRollingCoach ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3
            }}>
              <Typography variant="h6" gutterBottom color="text.primary">
                Rolling the dice...
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  minWidth: '120px',
                  height: '160px',
                  position: 'relative'
                }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ position: 'absolute', top: 0 }}>
                    Difficulty Dice
                  </Typography>
                  <Typography variant="h2" color="primary" sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    margin: 0
                  }}>
                    {diceResult || '?'}
                  </Typography>
                  {isRollingDifficulty && (
                    <CircularProgress 
                      size={40} 
                      sx={{ 
                        color: 'primary.main',
                        position: 'absolute',
                        bottom: 0
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  minWidth: '120px',
                  height: '160px',
                  position: 'relative'
                }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ position: 'absolute', top: 0 }}>
                    Coach Help Dice  
                  </Typography>
                  <Typography variant="h2" color="secondary" sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    margin: 0
                  }}>
                    {coachDiceResult || '?'}
                  </Typography>
                  {isRollingCoach && (
                    <CircularProgress 
                      size={40} 
                      sx={{ 
                        color: 'primary.main',
                        position: 'absolute',
                        bottom: 0
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          ) : !diceResult || !coachDiceResult ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3
            }}>
              <Typography variant="h6" gutterBottom color="text.primary">
                Roll the dice to get your next question!
              </Typography>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Difficulty Dice
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={rollDifficultyDice}
                    disabled={isRollingDifficulty || isRollingCoach || hasRolledDifficulty}
                    sx={{ 
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    Roll Difficulty
                  </Button>
                  {diceResult && (
                    <Typography variant="h4" color="primary">
                      {diceResult}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Coach Help Dice 
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={rollCoachDice}
                    disabled={isRollingDifficulty || isRollingCoach || hasRolledCoach}
                    sx={{ 
                      bgcolor: 'secondary.main',
                      '&:hover': {
                        bgcolor: 'secondary.dark',
                      },
                    }}
                  >
                    Roll Coach
                  </Button>
                  {coachDiceResult && (
                    <Typography variant="h4" color="secondary">
                      {coachDiceResult}
                    </Typography>
                  )}
                </Box>
              </Box>
              {diceResult && coachDiceResult && (
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleContinue}
                  sx={{ 
                    bgcolor: 'success.main',
                    '&:hover': {
                      bgcolor: 'success.dark',
                    },
                  }}
                >
                  Continue to Question
                </Button>
              )}
            </Box>
          ) : !showQuestion ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3
            }}>
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Difficulty Dice
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {diceResult}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Coach Help Dice 
                  </Typography>
                  <Typography variant="h3" color="secondary">
                    {coachDiceResult}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" color="primary">
                You rolled a {diceResult}!
              </Typography>
              <Typography variant="h5" color="text.primary">
                Your question will be {selectedDifficulty?.toUpperCase()}
              </Typography>
              {hasCoachHelp && (
                <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>
                  You got coach help for this question!
                </Typography>
              )}
              {!hasCoachHelp && (
                <Typography variant="h5" color="error.main" sx={{ fontWeight: 'bold' }}>
                  No coach help available for this question!
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleContinue}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Continue to Question
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h5" gutterBottom>
                Questions Answered: {gameState.usedQuestions.length}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Difficulty: {gameState.currentDifficulty.toUpperCase()}
              </Typography>
              {hasCoachHelp && (
                <Typography variant="h6" color="success.main" gutterBottom>
                  Coach Help Available!
                </Typography>
              )}
              <Typography variant="h6" gutterBottom>
                {currentQuestions[gameState.currentQuestionIndex].content.split('\n').map((line, i) => {
                  // Check if the line is part of a code block (indented)
                  const isCodeLine = line.startsWith('    ') || line.startsWith('\t');
                  return (
                    <React.Fragment key={i}>
                      {isCodeLine ? (
                        <div style={{ paddingLeft: '2em' }}>
                          {line.trim()}
                        </div>
                      ) : (
                        <>
                          {line}
                          <br />
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {currentQuestions[gameState.currentQuestionIndex].choices.map((choice, index) => (
                  <Button
                    key={index}
                    variant={currentAnswer === choice ? 'contained' : 'outlined'}
                    onClick={() => setCurrentAnswer(choice)}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                  >
                    {String.fromCharCode(65 + index)}. {choice}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmitAnswer}
                  disabled={!currentAnswer}
                >
                  Submit Answer
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </Button>
              </Box>
            </Box>
          )}

          {!gameState.isBreak && !isRollingDifficulty && !isRollingCoach && !diceResult && !coachDiceResult && !showQuestion && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleStartBreak}
              sx={{ 
                mt: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'primary.light',
                },
              }}
            >
              Take a Break
            </Button>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Game; 