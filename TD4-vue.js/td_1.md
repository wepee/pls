# Subject

This TD aims at learning framework-based front-end develoment in JS, through VueJS.
It also aims at "learning to learn", since learning a framework based on its documentation is a needed skill for a software engineer.

## Prerequisites

You are supposed to have Node.js, npm, and webpack installed and functionnal on your laptop.

# Output

The expected deliverable is a Git repo or a zip of your source code, with all your source files (HTML, JS, or CSS).

Send the URL of the Git repo or the zip by mail to your teacher : remy.girodon@gmail.com

# Activities

## Activity 1

Read following introduction and installation guides for VueJS :
- [https://fr.vuejs.org/v2/guide/index.html](Introduction)
- [https://fr.vuejs.org/v2/guide/installation.html](Installation)

Create an HTML - JS project that loads VueJS from its CDN, and displays a simple Hello World thanks to a Vue instance and Vue template language. 

Create the same "Hello World" project, but that loads VueJs and bundles it through npm and webpack.

## Activity 2

Read following guides for VueJs :
- [https://fr.vuejs.org/v2/guide/instance.html](Instance Life Cycle)
- [https://fr.vuejs.org/v2/guide/computed.html](Computed properties)
- [https://fr.vuejs.org/v2/guide/events.html](Events handling)

Take 2nd project from activity 1, and add the display of a computed property : the "reversed" message (hello => olleh)

Still in this project, add a button on the page, and an event handler in Vue instance that handles the click event on this button (the handler increments a counter property, and this property is displayed on the page).