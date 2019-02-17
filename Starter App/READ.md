## Run Starter App

### Backend API

Start server:

`service gunicorn restart`

You can use `postman` or `curl` to test these APIs.

- POST request 157.230.91.86/adduser/
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
