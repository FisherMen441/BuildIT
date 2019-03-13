"""REST API for recommend."""
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt 
import json
import buildIT


@buildIT.app.route('/api/recommend',
                    methods=["GET"])
def upload_image(postid_url_slug):
    """Recommend products.

    Example:
    {
      "file": xxxx.jpg
    }
    """

    user_id = flask.request.args.get('user_id')
    return flask.jsonify() # flask.render_template('create.html')
