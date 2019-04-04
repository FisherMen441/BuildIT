from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt 
import json

# Create your views here.
def recommend(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    user_id = int(request.GET.get('user_id'))
    cursor = connection.cursor()
    cursor.execute("SELECT FID, Img_url FROM Furniture;")
    furniture_result = cursor.fetchall()
    response = []
    for item in furniture_result:
        rsp = {
            'fid': item[0],
            'img': '/sql/uploads/' + item[1],
        }
        response += [rsp]
    return JsonResponse({'result': response})


def search(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    search_text = request.GET.get('search_text')
    search_text_lowercase = search_text.lower()
    cursor = connection.cursor()
    cursor.execute("SELECT Name, FID, Img_url FROM Furniture WHERE Name LIKE %s", ("%" + search_text_lowercase + "%",))
    furniture_result = cursor.fetchall()
    result_list = []
    for fur in furniture_result:
        result_list.append({
            'name': fur[0],
            'id': fur[1],
            'img_url': '/sql/uploads/' + fur[2]
        })
    response = {'result': result_list}
    return JsonResponse(response)


def comment(request):
    if request.method != 'GET' and request.method != 'POST':
        return HttpResponse(status=404)

    cursor = connection.cursor()
    if request.method == 'POST':
        furniture_id = int(request.POST.get('furniture_id'))
        step = int(request.POST.get('step'))
        user_id = int(request.POST.get('user_id'))
        body = request.POST.get('body')
        cursor.execute("INSERT INTO Comments (FID, SID, UID, Content) VALUES (%s, %s, %s, %s);"
                        (furniture_id, step, user_id, body))
        connection.commit()
    elif request.method == 'GET':
        furniture_id = int(request.GET.get('furniture_id'))
        step = int(request.GET.get('step'))

    if step == 0:
        cursor.execute("SELECT C.Content, U.User_name " +
                "FROM Comments C, Users U " + 
                "WHERE C.FID=%s AND U.UID = C.UID;", (furniture_id,))
    else:
        cursor.execute("SELECT C.Content, U.User_name " +
                    "FROM Comments C, Users U " + 
                    "WHERE U.UID = C.UID AND C.FID=%s AND C.SID=%s;", (furniture_id, step))
    comment_list = cursor.fetchall()
    result = []
    context = {'comments': []}
    for comment in comment_list:
        result.append({
            'User_name': comment[1],
            'Content': comment[0]
        })
    context['comments'] = result
    return JsonResponse(context)


def tools(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    furniture_id = int(request.GET.get('furniture_id'))
    step = int(request.GET.get('step'))
    cursor = connection.cursor()
    cursor.execute("SELECT TID FROM Tools_needed WHERE FID=%s AND SID=%s;", (furniture_id, step))
    tool_ids = cursor.fetchall()
    tool_list = []
    for tool_id in tool_ids:
        cursor.execute("SELECT Name, Img_url, Description FROM Tools WHERE TID=%s;", (tool_id[0],))
        info = cursor.fetchall()[0]
        tool_info = {
            'Name': info[0],
            'Img_url': '/sql/uploads/' + info[1],
            'Description': info[2]
        }
        tool_list += [tool_info]
    response = {'tool_list': tool_list, 'furniture_id': furniture_id, 'step': step}
    return JsonResponse(response)


def step_manual(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    furniture_id = int(request.GET.get('furniture_id'))
    step = request.GET.get('step')
    cursor = connection.cursor()
    cursor.execute("SELECT Img_url, Description FROM Steps WHERE FID=%s AND SID=%s;", (furniture_id, step))
    result = cursor.fetchall()
    if len(result) == 0:
        response = {
        'img_url': '',
        'description': ''}
    else:
        response = {
        'img_url': '/sql/uploads/' + result[0][0],
        'description': result[0][1]
    }
    
    return JsonResponse(response)
    

@csrf_exempt
def cv_upload(request):
    # if request.method != 'POST':
    #     return HttpResponse(status=404)
    if request.method == 'POST':
        print('post')
        print(request.body)
    print('cv_upload')
    response = {1: 10}
    return JsonResponse(response)


def videos(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    furniture_id = int(request.GET.get('furniture_id'))
    step = int(request.GET.get('step'))
    cursor = connection.cursor()
    cursor.execute("SELECT Video_loc FROM steps WHERE FID=%s AND SID=%s;", (furniture_id, step))
    video_loc = cursor.fetchall()
    if len(video_loc) == 0:
        response = {'video_loc': '', 'furniture_id': furniture_id, 'step': step}
    else:
        response = {'video_loc': '/sql/uploads/' + video_loc[0][0], 'furniture_id': furniture_id, 'step': step}
    return JsonResponse(response)


def furniture_info(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    furniture_id = int(request.GET.get('furniture_id'))
    cursor = connection.cursor()
    cursor.execute("SELECT Name, Description, Img_url FROM Furniture WHERE FID=%s;", (furniture_id,))
    furniture_result = cursor.fetchall()
    if len(furniture_result) == 0:
        response = {
            'Name': '',
            'Description': '',
            'Img_url': '',
            'furniture_id': furniture_id
        }
    else:
        response = {
            'Name': furniture_result[0][0],
            'Description': furniture_result[0][1],
            'Img_url': '/sql/uploads/' +  furniture_result[0][2],
            'furniture_id': furniture_id
        }
    return JsonResponse(response)
    