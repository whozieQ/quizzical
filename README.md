# Quizzical

## A Solo React project by Susan Briggs

At the conclusion of the React Basics module we were challenged to work solo to create a quiz-type app using the React basics we had learned.

### Key requirements include:
1. Follow Figma guidelines found here: https://www.figma.com/file/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0%3A1 (but feel free to put your own spin on it)
2. Leverage the OTDB API to pull trivia questions
3. Use a separate 'start' screen that lets the user click a button to start the quiz
4. Use a separate 'questions' screen that displays 5 trivia questions, lets the user choose answers to each, and click a button to check their answers
5. Update the questions screen to show correct answers and a score. 
6. Let the user click a button to play again.

### Game Plan
I started by breaking down the app into these major tasks/sequence
1. Setup the basic project, github, react, etc 
2. Create an initial Start page and a placeholder Questions page. Implement Start button so it opens the Questions page.
3. Implement code to pull trivia questions and save a sample result as temporary static data to work with
4. Implement component to display a single question with its answers. 
5. Add ability to click answer buttons and show selections. This should lead to a clear understanding of what props/object data will be needed for each question component.
6. Set up an array of question components which can be displayed. This should lead to an initial understanding of what array-level props may be needed.
7. Hook up the Start button so it switches from the start page to the question page with displayed questions
8. Implement code to check the answers and track results (state data)
9. Hook up the Check answers button to it executes the check answers code and displays results
10. Implement Play Again button (very similar to/same as Start button)
11. Work on styling!
