#!/bin/bash

# Stop on errors
set -e
set -x

cd backend
python3 manage.py runserver 0.0.0.0:8000
