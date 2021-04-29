# M2 - 

## How it looks

🔗 [Live Demo]()

<a href="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen1.png?raw=true" target="_blank">
<img src="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen1.png?raw=true" width="120px" height="260px">
</a>
<a href="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen2.png?raw=true" target="_blank">
<img src="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen2.png?raw=true" width="120px" height="260px">
</a>
<a href="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen3.png?raw=true" target="_blank">
<img src="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen3.png?raw=true" width="120px" height="260px">
</a>
<a href="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen4.png?raw=true" target="_blank">
<img src="https://github.com/Silinde87/repo-media/blob/main/images/servicewall-screen4.png?raw=true" width="120px" height="260px">
</a>

## Description

Online marketplace for freelance digital services where you can buy and sell gigs. You can hire a freelancer as well as work as one.


## Built with
- HTML / CSS / JavaScript / Handlebars
- npm / MongoDB / NodeJS / ExpressJS
- Stripe / Mapbox / Nodemailer / Cloudinary / PassportJS


## User Stories
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
|   `/auth/login`  |     `POST`    | Sends login form, redirects to `profile` view.         |  {email, password} |
|   `/auth/signup` |     `GET`     | Sign up screen. Renders `signup` view.                 |                    |
|   `/auth/signup` |     `POST`    | Sends signup form and creates User in DB. Redirects to `index` view. (cat.)|{ username, email, password, phone_number, image }|
|   `/auth/logout` |     `GET`     | Log out screen. Redirects to `login` view. (cat.)      |                    |
|   `/auth/google` |     `GET`     | Social login with PassportJS Google.                   |                    |
|`/categories/:name`|    `GET`     | Specific Category screen. Renders `category` view.     |                    |
|`/service/create` |     `GET`     | Create Service screen. Renders `service-create` view.  |                    |
|`/service/create` |     `POST`    | Sends Service form and creates service in DB. Redirects to `profile` view. |{ user.username, user.image, description, price, location, image, user_id, category }|
|`/service/search` |     `GET`     | Search a Service by description. Renders `service-list` view. |             |
|`/service/:id/edit`|    `GET`     | Edit Service screen. Renders `service-edit` view.      |                    |
|`/service/:id/edit`|     `POST`   | Sends edit Service form and update service in DB. Redirects to `profile` view.|{ user.username, user.image, description, price, location, image, category }|
|`/service/:id/delete`|   `POST`   | Deletes a Service from DB. Redirects to `profile` view.|{ service_id } |
|`/service/:id/book`|    `GET`     | Book a service screen. Renders `service-book` view.    |                    |
|  `/service/:id`  |     `GET`     | Specific Service screen. Renders `service` view.       |                    |
|`/stripe/success/:id`|   `GET`    | Update customer User's bookedServices and seller User's soldServices from DB. Renders `stripe/success` view.       |  { service_id }  |
| `/stripe/cancel` |     `GET`     | Cancel url from stripe API. Renders `stripe/cancel` view.       |                    |
|   `/stripe/:id`  |     `POST`    | Creates stripe's session and process the paymen. Redirects to `stripe/success` or `stripe/cancel` view. |{ service_id, description, date } |
|`/profile/:id/review/:service_id`|   `GET`    | Review screen. Renders `review` view.                  |                    |
|`/profile/:id/review`|   `POST`   | Sends Review form and pushes a review to reviews array from User in DB. Redirects to `index` view.| { username, description, rate,user_id } |
|`/profile/:id/delete`|   `POST`   | Deletes an User from DB. Redirects to `login` view.    |     { user_id }    |
|`/profile/:id/edit`|     `GET`    | Edit User screen. Renders `user-edit`.                 |                    |
|`/profile/:id`|     `POST`   | Sends User form and update User in DB. Redirects to `profile` view | { username, phone_number, image, password } |
|    `/profile`   |     `GET`     | Specific User screen. Renders `profile` view.     |                    |


## Models

### Service.model.js
```javascript
{
    description: { type: String, required: true },
    price: { type: Number, min: 1, required: true },
    location: [ { type: String, required: true } ],
    publication_date: {type: Date, default: Date.now , required: true },
    image: { type: String, default: "" },
    user_id: { type: ObjectId, ref: 'User', required: true },
    category: { 
        name: { type: String, required: true },
        image: { type: String, required: true }
    }
}
```
### User.model.js
```javascript
{
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 6 },
    phone_number: { type: String },
    rate: { type: Number, min: 0, max: 5, default: 0 },
    image: { type: String, default: "https://res.cloudinary.com/dkevcmz3i/image/upload/v1619125766/Service-Wall/user_avatar_xyyphc.png" },
    linkedIn_id: { type: String },
    google_id: { type: String },
    bookedServices: [ { type: ObjectId, ref: 'Service' }, default: [] ],
    soldServices: [ { type: ObjectId, ref: 'Service' }, default: [] ],
    reviews: [ {
        username: { type: String, required: true },
        description: { type: String, required: true },
        rate: { type: number, min: 0, max: 5, required: true },
        date: { type: Date, default: Date.now, required: true },  
    }, default: [] ]
}
```

## Backlog
- Implement axios at /service/search to avoid refresh page on search.
- Allow user to recover/change his password through his email.


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
