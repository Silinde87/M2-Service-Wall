# M2 - 

## How it looks

🔗 [Live Demo]()


## Description

e-commerce for services

## User Stores
- **404** - As users, we want to see a nice 404 error page when I go to a page that doesn’t exist so that we know it was our fault. 🙊
- **500** - As users, we want to see a nice 500 error page when the team behind the app brokes something and it's not our fault. 🦦
- **Homepage** - As users, we want to be able to access the homepage and select by category service and search by specific service. 🦁
- **Category page** - As users, we want to be able to see all the service available inside a category. 🐯
- **Service page** - As users, we want to see the details of a selected service, and book it. 🐆
- **Booking page** - As users, we must be able to book a service, select a date, contact with the seller and pay for it. 🐱
- **Review page** - As users, we want to be able to make a review to the user who provides the service booked. 🦄
- **Sign up** - As users, we want to be able to create an account and sell amazing services. 🐣
- **Log in** - As users, we want to be able to log in and manage our profile and services. 🐥
- **Profile page** - As users, we want to be able to edit our profile, manage our services and visualize our history of sold and booked services. 🦢
- **Create Service page** - As users, we want to be able to create a new service. 🐷
- **Edit Service page** - As users, we want to be able to edit a service. 🐽



## Server Routes (back-end)

|     **Route**    | **HTTP Verb** |                     **Description**                    | **Request - body** |
|------------------|---------------|--------------------------------------------------------|--------------------|
|        `/`       |     `GET`     | Main screen. Renders `index` view. (categories)        |                    |
|   `/auth/login`  |     `GET`     | Login screen. Renders `login` view.                    |                    |
|   `/auth/login`  |     `POST`    | Sends login form, redirects to `index` view. (cat.)    |{email, password}|
|   `/auth/signup` |     `GET`     | Sign up screen. Renders `signup` view.                 |                    |
|   `/auth/signup` |     `POST`    | Sends signup form and creates User in DB. Redirects to `index` view. (cat.)|{ username, email, password, phone_number, image }|
|   `/auth/logout` |     `GET`     | Log out screen. Renders `logout` view. Redirects to `login` view. (cat.)|   |
|`/categories/:id` |     `GET`     | Specific Category screen. Renders `category` view.     |                    |
|`/service/create` |     `GET`     | Create Service screen. Renders `service-create` view.  |                    |
|`/service/create` |     `POST`    | Sends Service form and creates service in DB. Redirects to `user-profile` view.   |{ name, description, price, location, image, user_id, category_id }|
|`/service/:id/edit`|    `GET`     | Edit Service screen. Renders `service-edit` view.      |                    |
|`/service/:id/edit`|     `POST`   | Sends edit Service form and update service in DB. Redirects to `user-profile` view.|{ name, description, price, location, image, category_id }|
|`/service/:id/delete` |   `POST`  | Deletes a Service from DB. Redirects to `user-profile` view.|{ service_id } |
|`/service/:id/book`|   `POST`  | Book a Service and update client User's bookedServices and seller User's soldServices from DB. Redirects to `stripe` view. |{ serviceName, servicePrice, serviceUsername, serviceUser_id } |
|  `/service/:id`  |     `GET`     | Specific Service screen. Renders `service` view.       |                    |
|`/profile/:id/review`|   `GET`    | Review screen. Renders `review` view.                  |                    |
|`/profile/:id/review`|   `POST`   | Sends Review form and create Review in DB. Redirects to `index` view.| { username, description, rate,user_id } |
|`/profile/:id/delete`|   `POST`   | Deletes an User from DB. Redirects to `login` view.    |     { user_id }    |
|`/profile/:id/edit`|     `GET`    | Edit User screen. Renders `user-edit`.                 |                    |
|`/profile/:id/edit`|     `POST`   | Sends User form and update User in DB. Redirects to `user-profile` view | { username, phone_number, image, password } |
|  `/profile/:id`  |     `GET`     | Specific User screen. Renders `user` view.     |                    |


## Models

### Category.model.js
```javascript
{
    name: { type: String, enum: [], required: true },
    services_id: [ { type: ObjectId, ref: 'Service' } ]
}
```
### Service.model.js
```javascript
{
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: [ { type: String, required: true } ],
    publication_date: {type: Date, default: 'timeStamp', required: true }, //maybe not a field
    image: { type: String, default: "" },
    user_id: { type: ObjectId, ref: 'User', required: true },
    category_id: { type: ObjectId, ref: 'Category', required: true }
}
```
### User.model.js
```javascript
{
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    rate: { type: Number, default: 0 },
    image: { type: String, default: "" },
    bookedServices: [ {
         serviceName: { type: String, required: true },
         servicePrice: { type: String, required: true},
         serviceUsername: { type: String, required: true},
         serviceUser_id: { type: ObjectId, ref: 'User', required: true } // Used to create a review
    }, default: [] ],
    soldServices: [ {
         serviceName: type: String, required: true,
         servicePrice: type: String, required: true,
         serviceUsername: type: String, required: true
    }, default: [] ]
}
```
### Review.model.js
```javascript
{
    username: {type: String, required: true },
    description: { type: String, required: true },
    rate: { type: number, required: true },
    date: { type: Date, default: 'timeStamp', required: true }, //maybe not a field
    user_id: { type: ObjectID, ref: 'User' }
}
```
## Backlog
- Style it responsive for bigger screens. Tablet and computer screens.


## Links
### Trello

[Link url](https://trello.com/b/FfMs8p3b/m2)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/Silinde87/M2-Service-Shop)
[Link Deploy]()

### Slides

URls for the project presentation
[Link Prezi.com]()
