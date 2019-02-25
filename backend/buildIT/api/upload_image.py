"""REST API for comments."""
import flask
import buildIT


@buildIT.app.route('/api/upload',
                    methods=["POST"])
def upload_image(postid_url_slug):
    """Upload image.

    Example:
    {
      "file": xxxx.jpg
    }
    """

    file = flask.request.files["file"]
    # hash_filename = insta485.model.save_file(file) do we need to hash the file?
    # use cv functions
    return flask.jsonify() # flask.render_template('create.html')
