# BuildIT
We help you pick the right piece to build your world.

## Getting Started

```
git clone https://github.com/FisherMen441/BuildIT.git
```

## Frontend

### Frontend Folder and File Structure
```
    .
    frontend
    └── BuildIT
        ├── App.js
        ├── app.json
        ├── assets
        │   ├── back.png
        │   ├── icon.png
        │   ├── qr_code.png
        │   ├── search.png
        │   ├── splash.png
        │   ├── swipedown.png
        │   ├── swipeup.png
        │   └── takepic.jpg
        ├── babel.config.js
        ├── components
        │   ├── CommentBox.js
        │   ├── PicStack.js
        │   ├── RecommendSlider.js
        │   ├── ScaleImage.js
        │   ├── SearchQR.js
        │   └── variable.js
        ├── config.js
        ├── navigation
        │   ├── AppNavigator.js
        │   └── MainTabNavigator.js
        ├── package-lock.json
        ├── package.json
        └── screens
            ├── CameraScreen.js
            ├── CameraToolScreen.js
            ├── CommentScreen.js
            ├── HomeScreen.js
            ├── IntroScreen.js
            ├── QRScreen.js
            ├── SearchScreen.js
            ├── StepScreen.js
            └── ToolScreen.js
```
### Build Instructions

We use React Native for the app.

Install `node` on MacOS:`brew install node`

Launch the app frontend:

```
chmod +x startFrontend.sh
./startFrontend.sh
```

If you tried the frontend before, use `./startFrontend.sh -s` for simple start. This will be much faster.

There will be a website window with a QR code.

Now download the app [`Expo`](https://expo.io/) to our phone.

If you are using iPhone, open your camera and aim at the QR code. Then open the app `Expo`. 

If you are using Android phone, open `Expo` and go to `Projects -> Scan QR Code`.

## Backend

### Backend Folder and File Structure
```
    .
    backend
    ├── README.md
    ├── api
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── buildIT
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── freezed_graph
    │   │   ├── checkpoint
    │   │   ├── frozen_inference_graph.pb
    │   │   ├── model.ckpt.data-00000-of-00001
    │   │   ├── model.ckpt.index
    │   │   ├── model.ckpt.meta
    │   │   ├── pipeline.config
    │   │   ├── saved_model
    │   │   │   └── saved_model.pb
    │   │   └── script
    │   │       ├── cheatsheet.txt
    │   │       ├── graph.pbtxt
    │   │       ├── load_model.py
    │   │       ├── sort_node.py
    │   │       ├── sorted_inference_graph.pb
    │   │       ├── tf_text_graph_common.py
    │   │       └── tf_text_graph_ssd.py
    │   ├── load_model.py
    │   ├── migrations
    │   │   └── __init__.py
    │   ├── models.py
    │   ├── result.jpg
    │   ├── sift.py
    │   ├── tests.py
    │   ├── tool_reg
    │   │   ├── graph.pbtxt
    │   │   ├── load_model.py
    │   │   ├── sorted_inference_graph.pb
    │   │   ├── test.jpg
    │   │   └── text.jpg
    │   ├── tools_result.jpg
    │   └── views.py
    ├── manage.py
    └── sql
        ├── data.sql
        ├── drop.sql
        ├── schema.sql
        └── uploads
            └── *.png
```
### Backend APIs

| API                                   | Method   | Describe                                                     |
| ------------------------------------- | -------- | ------------------------------------------------------------ |
| /api/recommend/?user_id=xxx            | GET      | Recommend furniture for user                                 |
| /api/search/?search_text=xxx          | GET      | Search the furniture                                         |
| /api/comment/?furniture_id=xxx&step=xx | GET/POST | Get/Post the comments for the furniture                      |
| /api/tools/?furniture_id=xxx&step=xx   | GET      | Get the tools for the furniture                              |
| /api/manual/?furniture_id=xxx&step=xx  | GET      | Get the stepwise information for the furniture (picture and description ) on the paper manual |
| /api/upload/                           | POST     | Post images token by camera to backend for CV analysis, return the path of the result image         |
| /api/videos/?furniture_id=xxx&step=xx  | GET      | Get the stepwise instruction for the furniture of step xx    |
| /api/furniture_info/?furniture_id=xxx | GET | Get the furniture infor for intro screen |
| /api/like_comment/ | POST | Post likes/unlikes for the comments whith filed comment_id=xxx and like=true/false |
| /api/rate_comment/ | POST | Rate comments whith filed comment_id=xxx and star=xxx |

### Backend Dadabase

#### Tables

1. User Table: Each row represents a user with a unique UID. Each user has a user_name and a password.
2. Furniture Table: Each row represents a set of furniture with a unique FID. Each furniture has a name, description and an integer number indicates the total number of steps for assembling the furniture
3. Steps Table: Each row represents a step with a unique pair of (FID, SID) indicating it is the SIDth step to assemble the set of furniture of FID. Each step has a video_loc and a description.
4. Comments Table: each row is a comment associated with a step uploaded by a certain user.
5. Components/Tools Table: these 2 are very similar. Each row is a component/tool, with a unique CID/TID, a name, a url to its image and a description.
6. Components/Tools_needed Table: Each row is a component/tool needed for the step (FID, SID).

### Local Setup

We use MYSQL for our database.

* Create local database

```
mysql.server start // start sql local server
mysql -u root -p // open mysql
mysql> CREATE DATABASE buildIT CHARACTER SET UTF8;
mysql> CREATE USER buildITuser@localhost IDENTIFIED BY '123';
mysql> GRANT ALL PRIVILEGES ON buildIT.* TO buildITuser@localhost;
mysql> FLUSH PRIVILEGES;
mysql> exit
```

* Create tables

```
cd backend/sql
mysql -uroot buildIT < schema.sql
```

* Create super user and start server

```
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

Go to `0.0.0.0:8000/admin` and you can see the details for the database.
