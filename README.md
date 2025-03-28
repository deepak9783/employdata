# Overview
This is a React application that integrates with the Regres API to perform basic user management functions, including authentication, listing users, and editing/deleting user data.

# Features
1.Authentication Screen: Login with predefined credentials (email: eve.holt@regres.in, password: cityslicka).

2.Users List: Paginated display of users with their first name, last name, and avatar.

3.Edit/Delete Users: Options to edit or delete user details with appropriate API calls.

4.Responsive UI: Works well on both desktop and mobile devices.

5.Error Handling: Graceful handling of API errors and form validation.

# Technologies Used

React: Frontend framework.

React Router: For navigation between pages.

Axios: For HTTP requests to the Regres API.

Bootstra: For styling and responsive design.

React Context API: For state management (optional, if used).

# Live Demo
https://employdata-list.netlify.app/login
# Installation

To run this project locally, follow these steps:

1.Clone the repository:[git clone [https://github.com/deepak9783/employdata.git](https://github.com/deepak9783/employdata.git)

2.Navigate to the project directory:[cd employwise-app](cd employwise-app)

3.Install the dependencies:[npm install](npm install)

4.Start the development server:[npm start](npm start)

5.Open your browser and visit:[http://localhost:3000](http://localhost:3000)

## Assumptions and Considerations

The login credentials are hardcoded as per the assignment instructions (eve.holt@regres.in and cityslicka).

The application uses session storage to persist the login token.

Pagination is implemented to navigate through user pages.

Error messages are displayed for failed API calls or invalid form inputs.

## Bonus Features Implemented

Client-side search and filtering: Users can search and filter the list of users.

React Router: Used for seamless navigation between the login, user list, and edit user pages.

Hosted on Netlify: The application is deployed and accessible online.
