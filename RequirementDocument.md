
 Features, HLD, LLD & Planning

Dive into the planning phase of building a project by breaking down the core features. This episode covers creating both high-level designs (HLD) and low-level designs (LLD), which will guide your dev

Tech Stack - Frontend [React]  |  Backend [NodeJS, Mongo]

Dev Tinder - 
Features
1. Create Account
2. Login
3. update profile
4. Feed of exploration
5. Send Connection request 
6. See our matches
7. Sent/received requests



## Dev Tinder APIs

# authRoute
1. POST         /Singup 
2. POST         /login
3. POST         /logout

# profileRoute
4. GET          /Profile/view
5. Patch        /profile/edit
6. Patch        /profile/password

# coonectionRequestRoute
-- status : interested, ignored
7. POST         :userId/request/send/:status

-- status : accepted, rejected
8. POST         /Request/review/:status/:requestedId
9.  GET         /Requests/recieved

# feedRoute

10. GET         /Connections
11. GET         /feed



Status : ignore, intereseted, accepted, rejected