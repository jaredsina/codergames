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
import { GameState } from '../types';

type Category = 'Python' | 'Scratch' | 'HTML/CSS/Javascript';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  id: number;
  type: 'implement' | 'fix' | 'explain';
  content: string;
  correctAnswer: string;
  points: number;
  timeLimit: number;
  category: Category;
  difficulty: Difficulty;
  choices: string[];
}

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
    "content": "What is the output of this code?\n\n```python\nx = [1, 2, 3]\nprint(x[-1])\n```",
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
    "content": "What does this code print?\n\n```python\nfor i in range(1, 4):\n    print(i * '*')\n```",
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
    "content": "What is the output of:\n\n```python\nx = [1, 2, 3]\nx.append([4, 5])\nprint(x)\n```",
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
    "content": "What does this function return?\n\n```python\ndef mystery(a):\n    return a[::-1]\n```\n\nWhat will `mystery('abc')` return?",
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
    "content": "What is the output?\n\n```python\ndef func(a, b=[]):\n    b.append(a)\n    return b\n\nprint(func(1))\nprint(func(2))\n```",
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
    "content": "What is the output of this code?\n\n```python\nx = [1, 2, 3]\ny = x\nx[0] = 99\nprint(y)\n```",
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
    "content": "What is the output?\n\n```python\nx = (i*i for i in range(3))\nprint(list(x))\nprint(list(x))\n```",
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
    "content": "What does this code return?\n\n```python\nprint(''.join(sorted('cab')))\n```",
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
    "content": "What is the output?\n\n```python\ndef foo(x, y):\n    return x if x > y else y\nprint(foo(3, 5))\n```",
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
    "content": "What is the result of:\n\n```python\nprint(0.1 + 0.2 == 0.3)\n```",
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
    "content": "What will be printed?\n\n```python\nx = [1, 2, 3]\nprint(x.pop(1))\nprint(x)\n```",
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
    "content": "What is the output?\n\n```python\ndef add_items(a, b=[]):\n    b.append(a)\n    return b\n\nprint(add_items(1))\nprint(add_items(2))\n```",
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
      }
    ]
  }
};

const Game = () => {
  const navigate = useNavigate();
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [isRollingDifficulty, setIsRollingDifficulty] = useState(false);
  const [isRollingCoach, setIsRollingCoach] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [coachDiceResult, setCoachDiceResult] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [hasCoachHelp, setHasCoachHelp] = useState(false);
  const [hasRolledDifficulty, setHasRolledDifficulty] = useState(false);
  const [hasRolledCoach, setHasRolledCoach] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [questionCount, setQuestionCount] = useState(0);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    timeRemaining: 1800,
    isBreak: false,
    mainTimerPaused: false,
    mainTimeRemaining: 1800,
    currentDifficulty: 'easy',
    correctAnswers: 0
  });

  const selectedCategory = localStorage.getItem('selectedCategory') as Category || 'Python';
  const currentQuestions = questionsByCategory[selectedCategory][gameState.currentDifficulty];

  const getRandomUnusedQuestion = () => {
    const availableQuestions = currentQuestions.filter((_, index) => !usedQuestions.has(index));
    if (availableQuestions.length === 0) {
      // If all questions in current difficulty are used, move to next difficulty
      if (gameState.currentDifficulty === 'easy') {
        setGameState(prev => ({
          ...prev,
          currentDifficulty: 'medium',
          currentQuestion: 0
        }));
        setUsedQuestions(new Set());
        return 0;
      } else if (gameState.currentDifficulty === 'medium') {
        setGameState(prev => ({
          ...prev,
          currentDifficulty: 'hard',
          currentQuestion: 0
        }));
        setUsedQuestions(new Set());
        return 0;
      } else {
        // If we've used all questions in all difficulties, end the game
        const storedTeams = localStorage.getItem('teams');
        if (storedTeams) {
          const teams = JSON.parse(storedTeams);
          if (teams.length > 0) {
            teams[0].score = totalPoints;
            localStorage.setItem('teams', JSON.stringify(teams));
          }
        }
        navigate('/leaderboard');
        return 0;
      }
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = currentQuestions.findIndex(q => q.id === availableQuestions[randomIndex].id);
    setUsedQuestions(prev => new Set([...prev, questionIndex]));
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
      // Set coach help if coach dice is 1 (10% chance)
      setHasCoachHelp(finalResult === 1);
    }, 1000);
  };

  const handleContinue = () => {
    if (selectedDifficulty) {
      const newQuestionIndex = getRandomUnusedQuestion();
      setGameState(prev => ({
        ...prev,
        currentDifficulty: selectedDifficulty,
        currentQuestion: newQuestionIndex
      }));
      setShowQuestion(true);
      setQuestionCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeRemaining > 0) {
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          };
        } else {
          clearInterval(timer);
          if (prev.isBreak) {
            return {
              ...prev,
              isBreak: false,
              timeRemaining: prev.mainTimeRemaining,
              mainTimerPaused: false,
            };
          } else {
            const storedTeams = localStorage.getItem('teams');
            if (storedTeams) {
              const teams = JSON.parse(storedTeams);
              if (teams.length > 0) {
                teams[0].score = totalPoints;
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
  }, [navigate, totalPoints]);

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
      const currentQuestion = currentQuestions[gameState.currentQuestion];
      const isCorrect = currentAnswer.trim() === currentQuestion.correctAnswer;
      
      if (isCorrect) {
        setTotalPoints(prev => prev + currentQuestion.points);
        setGameState(prev => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1
        }));
      }
      
      setCurrentAnswer('');
      setDiceResult(null);
      setCoachDiceResult(null);
      setShowQuestion(false);
      setSelectedDifficulty(null);
      setHasCoachHelp(false);
      setIsRollingDifficulty(false);
      setIsRollingCoach(false);
      setHasRolledDifficulty(false);
      setHasRolledCoach(false);
    }
  };

  const handleNextQuestion = () => {
    const newQuestionIndex = getRandomUnusedQuestion();
    setGameState(prev => ({
      ...prev,
      currentQuestion: newQuestionIndex
    }));
    setCurrentAnswer('');
    setDiceResult(null);
    setCoachDiceResult(null);
    setShowQuestion(false);
    setSelectedDifficulty(null);
    setHasCoachHelp(false);
    setIsRollingDifficulty(false);
    setIsRollingCoach(false);
    setHasRolledDifficulty(false);
    setHasRolledCoach(false);
  };

  const handleStartBreak = () => {
    setGameState(prev => ({
      ...prev,
      isBreak: true,
      timeRemaining: 300, // 5 minutes for break
      mainTimerPaused: true,
      mainTimeRemaining: prev.timeRemaining,
    }));
  };

  const handleSkipBreak = () => {
    setGameState(prev => ({
      ...prev,
      isBreak: false,
      timeRemaining: prev.mainTimeRemaining,
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
              Points: {totalPoints}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="text.primary">
              {getCurrentPhase()}
            </Typography>
            <Typography variant="h4" align="center" gutterBottom color="text.primary">
              {formatTime(gameState.timeRemaining)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(gameState.timeRemaining / (gameState.isBreak ? 300 : 1800)) * 100}
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
                Questions Answered: {questionCount}
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
                {currentQuestions[gameState.currentQuestion].content}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {currentQuestions[gameState.currentQuestion].choices.map((choice, index) => (
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