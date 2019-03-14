from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt 
import json

# Create your views here.

def recommend(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    user_id = int(request.GET.get('id'))
    #TODO: Add SQL query if necessary
    response = {}
    response['recommend']  = 'placeholder'
    return JsonResponse(response)
   

def search(request):
    pass

def comment(request):
    pass

def tools(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    furniture_id = request.GET.get('furniture_id')
    step = request.GET.get('step')
    cursor = connection.cursor()
    cursor.execute("SELECT TID FROM Tools_needed WHERE FID=? AND SID=?", (furniture_id, step))
    tool_ids = cursor.fetchall()
    tool_list = []
    for tool_id in tool_ids:
        cursor.execute("SELECT * FROM Tools WHERE TID=?", (tool_id['TID']))
        info = cursor.fetchall()[0]
        tool_info = {
            'Name': info['Name'],
            'Img_url': info['Img_url'],
            'Description': info['Description']
        }
        tool_list += [tool_info]
    response = {'tool_list': tool_list}
    return JsonResponse(response)

def step_manual(request):
    if request.method != 'GET':
        return HttpResponse(status=404)
    

def cv_upload(request):
    pass

def video(request):
    pass
