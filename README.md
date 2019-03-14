# BuildIT
We help you pick the right piece to build your world.

## Getting Started

```
git clone https://github.com/FisherMen441/BuildIT.git
```

## Folder Structure

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

## Frontend

We decide to use React-Native for frontend development.

## Backend

### Backend APIs

| API                                   | Method   | Describe                                                     |
| ------------------------------------- | -------- | ------------------------------------------------------------ |
| /api/recommend?user_id=xxx            | GET      | Recommend furniture for user                                 |
| /api/search                           | GET      | Search the furniture                                         |
| /api/comment?furniture_id=xxx&step=xx | GET/POST | Get/Post the comments for the furniture                      |
| /api/tools?furniture_id=xxx&step=xx   | GET      | Get the tools for the furniture                              |
| /api/manual?furniture_id=xxx&step=xx  | GET      | Get the stepwise information for the furniture (picture and description ) on the paper manual |
| /api/upload                           | POST     | Post the image/live video to backend for CV analysis         |
| /api/videos?furniture_id=xxx&step=xx  | GET      | Get the stepwise instruction for the furniture of step xx    |

### Backend DB
1. User Table: Each row represents a user with a unique UID. Each user has a user_name and a password.
2. Furniture Table: Each row represents a set of furniture with a unique FID. Each furniture has a name, description and an integer number indicates the total number of steps for assembling the furniture
3. Steps Table: Each row represents a step with a unique pair of (FID, SID) indicating it is the SIDth step to assemble the set of furniture of FID. Each step has a video_loc and a description.
4. Comments Table: each row is a comment associated with a step uploaded by a certain user.
5. Components/Tools Table: these 2 are very similar. Each row is a component/tool, with a unique CID/TID, a name, a url to its image and a description.
6. Components/Tools_needed Table: Each row is a component/tool needed for the step (FID, SID).

### Create MYSQL database and do local test
Open terminal <br>
```
mysql -u root -p <br>
CREATE DATABASE buildIT CHARACTER SET UTF8;<br>
CREATE USER myuser@localhost IDENTIFIED BY 'password';<br>
GRANT ALL PRIVILEGES ON buildIT.* TO myuser@localhost;<br>
FLUSH PRIVILEGES;<br>
exit
```
Go to backend/api/settings.py and change DATABASE section to <br>
```json
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'buildIT',
        'USER': 'buildITuser',
        'PASSWORD': '123',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```
Create super user and start server
```
python manage.py createsuperuser<br>
python manage.py runserver 0.0.0.0:8000
```
