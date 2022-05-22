# Book-Search-with-MERNie-n-Friends

A Google Books API search engine built using RESTful API and follows a MERN stack structuring. There is a REACT front end, a database with MongoDB, and a back-end with Node/Express.js and API.


## User Story
```
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Acceptance Criteria
```
GIVEN a book search engine
WHEN I load the search engine

THEN I am presented with a menu with the options
    * Search for Books
    * Login-Signup
    * An input field to search for books
    * A submit button

WHEN I am NOT logged in and enter a search term in the input field and click the submit button

THEN I am presented with several search result, each featuring:
    * A book's title
    * Its description
    * The book's image
    * A link to that book on the Google Books site

WHEN I click on the Login/Signup menu option

THEN a modal appears on the screen with a toggle between the option to login or signup

WHEN the toggle is set to Signup

THEN I am presented with the following inputs and a signup button:
    * A username
    * A email address
    * A password

WHEN the toggle is set to Login

THEN I am presented with the following inputs and a login button:
    * An email address
    * A password

WHEN I enter a valid email address, create a password and click on the signup button

THEN my user account is created and I am logged into the site

WHEN I enter my acount's email address and password and click on the login button
THEN the modal closes and I am logged into the site

WHEN I am logged into the site
THEN the menu options change to: 
    * Search for Books
    * An option to see my saved books
    * Logout

WHEN I am logged in and enter a search term in the input field and click on the submit button

THEN I am presented with several search results featuring the following:
    * A book's title
    * A book's author
    * The book's description
    * The book's image
    * A link to the book on the Google Books site
    * A button to save the book to my account

When I click on the Save button on a book
THEN the book's information is saved to my account

WHEN I click on the option to see my saved books
THEN I am presented with ALL the books I have saved to my account, all showing:
    * Then book's title
    * The book's author
    * The book's description
    * The book's image
    * A link to that book on the Google Books site
    * A button to remove a book from my account

WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options:
    * Search for books
    * Login/Signup
    * An input field to search for books
    * A submit button
```

**NOTE**: There is already a front-end to this search engine. The back-end and front-end connections need to be fixed.


## Back-End Specifications

The following files need to complete the following tasks:

1) `auth.js`: Update the auth middleware function to work with the GraphQL API

2) `server.js`: Implement the Apollo Server and apply it to the Express server as middleware

3) `Schemas` directory:
    * `index.js`: Export your typeDefs and resolvers

    * `resolvers.js`: Define the query and mutation functionality to work with Mongoose models
        ***Hint***: Use the functionality in the `user-controller.js` as a guide

    * `typeDefs.js`: Define the necessary `Query` and `Mutation` types:

        * `Query` type:
            * `me`: Which returns a `User` type

        * `Mutation` type: 
            * `login`: Accepts an email and password as parameters; returns an `Auth` type

            * `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type

            * `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type (Look into creating what's knonw as an `input` type to handle all of these parameters)

            * `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type
        
        * `User` type:
            * `_id`
            * `username`
            * `email`
            * `bookCount`
            * `savedBooks` (This can be an array of the `Book` types)

        * `Book` type:
            * `bookId` (NOT the `_id`, but the book's `id` value returned from Google's Books API)
            * `authors` (An array of strings, as there may be more than one author)
            * `description`
            * `title`
            * `image`
            * `link`

        * `Auth` type:
            * `token`
            * `user` (references the `User` type)
**End of section**


## Front-End Specifications

Front end files that need to be created:

1) `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server

2) `mutations.js`:
    * `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server
    * `ADD_USER` will execute the `addUser` mutation
    * `SAVE_BOOK` will execute the `saveBook` mutation
    * `REMOVE_BOOK` will execute the `removeBook` mutation


3) `App.js`: Create an Apollo Provider to make every request work with the Apollo Server

4) `SearchBook.js`:
    * Use the Apollo `useMutation()` Hook to execute the `SAVE_BOOK` mutation in the 
    `handleSaveBook()`  function instead of the `saveBook()` function imported from the `API` file

    * Make sure you keep the logic for saving the book's ID to state in the `try.....catch` block!


5) `SavedBooks.js`:
    * Remove the `useEffect()` Hook that sets the state for `UserData`

    * Instead, use the `useQuery()` hook to execute the `GET_ME` query on load and save it to a variable named `userData`

    * Use the `useMutation()` Hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from `API` file(Make sure you keep the `removeBookId()` function in place)

    * `SignupForm.js`: Replace the `addUser()` functionality imported from the `API` file with the `ADD_USER` mutation functionality

    * `LoginForm.js`: Replace the `loginUser()` functionality imported from the `API` file with the `LOGIN_USER` mutation functionality

**End of Section**