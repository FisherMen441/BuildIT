"""REST API for recommend."""
import flask
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
