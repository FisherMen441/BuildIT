# BuildIT
We help you pick the right piece to build your world.

## Getting Started

```
git clone https://github.com/FisherMen441/BuildIT.git
```

## Run Starter App

### Backend API

You can use `postman` or `curl` to test these APIs.

- POST request 157.230.91.86/registeruser/
- POST request 157.230.91.86/addchatt/
- GET request 157.230.91.86/getchatts/

### Frontend

We use React Native for the app.

Install `node` on MacOS:`brew install node`

Launch the app:

```
cd BuildIT/Starter\ App/frontend/Chatter
npm install -g expo-cli
npm install
npm start
```

There will be a website window with a QR code.

Now download the app [`Expo`](https://expo.io/) to our phone.

If you are using iPhone, open your camera and aim at the QR code. Then open the app `Expo`. 

If you are using Android phone, open `Expo` and go to `Projects -> Scan QR Code`.

##Folder Structure

Folder **Starter App** contains all the files needed to build the starter app: all your source codes, resources, meta data files, IDE project files or Makefiles. 

Folder **Starter App/frontend** contains all the files for frontend and UI.

Folder **Starter App/backend** contains all the files for backend.

## File List

    .
    ├── README.md
    ├── Starter App
    │   └── frontend
    │       └── Chatter
    │           ├── App.js
    │           ├── app.json
    │           ├── assets
    │           │   ├── icon.png
    │           │   └── splash.png
    │           ├── babel.config.js
    │           ├── components
    │           │   └── PostBar.js
    │           ├── package-lock.json
    │           └── package.json
    └── backend
        ├── README.md
        ├── chatter
        │   ├── __init__.py
        │   ├── admin.py
        │   ├── migrations
        │   │   └── __init__.py
        │   ├── models.py
        │   ├── tests.py
        │   └── views.py
        ├── django_project
        │   ├── __init__.py
        │   ├── settings.py
        │   ├── settings.py.orig
        │   ├── urls.py
        │   └── wsgi.py
        └── manage.py
