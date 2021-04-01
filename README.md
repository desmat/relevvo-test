# Relevvo Engineering Test

Hi, Welcome to the problem statement of the Relevvo Engineering Test. Before we start with the actual problem, a few notes on the thinking behind the design of this test for which there are two parts:

1. Programming Problem. This part has a dual purpose:
    a. Knowledge of algorithms and programming.
    b. GitHub dev/PR process during the solving of the presented problem. Please submit multiple PRs and self approve them as you evolve your solution.
2. Debate Question. To showcase the ability to articulate.

But first, I'd like to make clear as to what this test is not. We are interviewing senior people for a startup, not mid level or junior people in a FAANG setup. So,
the things we are lookng for are slightly different:

1. Some communication polish expected of a senior person.
2. In keeping with time pressure in a startup, some brevity and wit along with 1 above.
3. The ability to make quick trade-offs, usually in favour of simplicity and productivity at the expense of perfection but not to the extent that the solution is barely readable or barely scales.
4. The ability to be resourceful. Or here is a trick question: What is the best code ever written?
5. The ability to do TDD and insert intelligent comments and explanations within code. And in the same breath, to use advanced frameworks which might improve the performance and readability of the tests. And some intelligent selection of what is worth testing in the first place.
6. The ability to architect for future 'improvability'.
7. The ability to provide nuanced reasoning of design choices.

This is not a FAANG interview. I am not looking for very advanced architectures or scholarly knowledge of advanced programming paradigms. I don't expect you to remember advanced algorithms learnt in CS courses which you typically do not encounter in regular work. And there won't be any tricks or puzzles.

We are most likely going to work in a remote only setting. So, we are most likely going to need the ability to collaborate across time zones in written form with not-so-many verbal meetings.

And we need to be productive in such a setting and that's something that this test is trying to evaulate.

## Part 1: Programming Problem

1. Pick one of quick sort or merge sort and implement it in a language of your choice.
2. Provide some discussion of time and space complexity. Assume that the input is a list of positive integers starting with zero.
3. Discuss foolproofing (or lack of it) for the inputs w.r.t. to the environment the code might be running in. Same with error handling.
4. Feel free to use recursive or iterative variations with some discussion of what you would choose in a production setting and some discussion on how language choices affect this decision. And it would be nice if we could enter the territory of prebuilt implementations and their trade offs.
5. Please do write interesting tests which can test over large, generated inputs.

## Part 2: Debate Question

Assume that I am a senior person who is slightly hostile to others who do not to agree with my biases. But I do know my computer science, so hand wavy arguments or using authority will not work.

You've chosen Python as your programming language choice and one day I confront you with the dismissive comment: Python is a slow language. It is not even a real programming language. Golang is so much better. It is compiled and executes much faster. Let's switch over.

This is a fun question, and please treat it as such.

Without being disresepctul or adversarial, please defend your choice. Try and frame it as an optimisation rather than a right v/s wrong choice. And feel free to point to real life examples and online commentary to illustrate that.

Present a short written answer for this and prepare some thoughts for a verbal discussion.

**YOU CAN ADD YOUR WRITTEN DISCUSSIONS BELOW IN THIS README**
