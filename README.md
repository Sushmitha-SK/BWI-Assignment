# CartEase - E-Commerce App

CartEase is an E-Commerce web application built using React for the frontend, incorporating API implementation for seamless functionality. It provides a user-friendly interface for exploring products, searching, and managing the shopping cart.

## Live Demo

Check out the live demo of CartEase at: https://bwi-assignment-ecommerce-app.vercel.app/

## User Login

Use the following credentials to log in as an admin:

- Username: kminchelle
- Password: 0lelplR

## Features

- **Login Process:**

  - Implements a login process using the DummyJSON Auth API.
  - Handles user authentication and obtains a login token for authorization.

- **Token Authorization:**

  - Saves the login token to enable authorized access to protected routes and API calls.

- **Protected Home Page:**

  - Configures the home page as a protected route, ensuring only logged-in users can access it.

- **Product Fetching:**

  - Fetches product data from the DummyJSON Products API to display on the home page.

- **Product Search:**

  - Implements a search functionality allowing users to search for products based on their names.

- **Price Filter:**

  - Adds a filter option on the home page to filter products based on their prices.

- **Shopping Cart:**

  - Implements a shopping cart feature to allow users to add products to their cart.
  - Displays the cart count on the top navigation bar.
  - Shows the total amount of the items in the cart.
  - Shopping Cart Icon on clicking displays the entire products added to the cart and user can also remove the items from the cart.

- **Add to Cart Button:**

  - Integrates an "Add to Cart" button on product cards for a convenient shopping experience.

- **Sign Out:**
  - Implements a Sign Out functionality allowing the user to sign out successfully.

## Technologies Used

- ReactJS
- Redux Toolkit
- Material UI
- Protected Routing
- REST API Implementation
