
# Features

1.Login Screen
   1.Implementing the login screen interface using Form components.
   2.Form should have two fields (email and password)
   3.Form should be validated using react hook form and zod
   4.handle the form submission

2.Authentication
  1.It should be handle after submitting a validate form
  2.return a error message if there is not user with the given credentials
  3. strack if there is a user with a  boolean isAuthenticated in redux after the user authentication
  4. store the user token in the local storage
  5. using a axios inteceptor for adding the token to all users requests to the server
  
3.Authorization
  1.should protect all routes if the user is not a admin
  2.redirect to the login page in case the user is not a admin
  3. display a message after the user has been redirected

4.Users screen
  1.retrieve all users form the server
  2.create a new user instance through user form
  3.retrieve a single user to the server
