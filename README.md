# Coverflex Frontend Challenge

Hello dear frontend developer!

Your Project Manager needs you to build an app that can be used by company employees  to self-manage their benefits.
Our Designer is really busy right now, so you'll also need to help us on the UI side. However, you should focus on the UX side of it, because we wanted to start testing out inside the company. But don't worry, our Backend team has already a service up and running for you to use.
Each employee has a total of 500 FlexPoints, that they can spend on a list of available benefits.

Our Backend Developer already develop these API endpoints:
- `GET /api/users/:user_id`
    - returns a single user
    - if user_id doesn't exist, it creates a new user
    - output `{"user": {"user_id": "johndoe", "data": {"balance": 500, "product_ids": [...]}}}`
- `GET /api/products`
    - returns a list of all products
    - output `{"products": [...] }`
- `POST /api/orders`
    - creates a new order
    - input `{"order": {"items": ["product-1", "product-2"], "user_id": "johndoe"}}`
    - output 200 `{"order": {"order_id": "123", "data": {"items": [...], "total": 500}}}`
    - output 400 `{"error": "products_not_found"}`
    - output 400 `{"error": "products_already_purchased"}`
    - output 400 `{"error": "insufficient_balance"}`
    
Build a UI to cover the following use cases:
- Sign in
    - users should be able to sign in just with a username
- Placing an order
    - users should be able to browse all products
    - users should be able to order multiple products
    - users aren't allowed to order a product previously ordered
    - users should be able to see the already ordered products
    - users should be able to see the order total before ordering
    - users should be able to see current balance
    - users aren't allowed to place order which makes their balance below zero

**Notes:**
- You're free to use whatever means and technology to achieve the goal


# Backend service:
Our Backend Developer has kindly provided you a simple Phoenix server for you to test out your app.
You can access it at: https://coverflex-exercise.fly.dev/

Good Luck! 🙌
