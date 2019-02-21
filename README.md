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