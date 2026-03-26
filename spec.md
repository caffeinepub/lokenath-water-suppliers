# Lokenath Water Suppliers

## Current State
A single-page marketing website with sections: Home, Products, Price List, About Us, Order Form, and Footer/Contact. No user authentication or accounts.

## Requested Changes (Diff)

### Add
- Sign-up page allowing customers to create an account (name, email, phone, password)
- Login page for returning customers
- After login, customers see a "My Account" view with their profile
- Navigation link to Sign Up / Login
- Authorization component integration

### Modify
- Navbar to include Sign Up / Login button
- Nav links to include account access

### Remove
- Nothing removed

## Implementation Plan
1. Select authorization component
2. Generate backend with user registration support
3. Add SignupPage and LoginPage components to the frontend
4. Add routing between main site and auth pages (using simple state-based view switching)
5. Show logged-in user's name in navbar when authenticated
