from django.http.response import JsonResponse
from django.shortcuts import render
from datetime import datetime 
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from backend.settings import sendMail, sendResponse ,disconnectDB, connectDB, resultMessages,generateStr

# start dt_getusercourses
def dt_getusercourses(request):
    jsons = json.loads(request.body) 
    action = jsons["action"]
    print(jsons)
    try :
        userid = jsons['userid'] 
    except:
        action = jsons['action']
        respdata = []
        resp = sendResponse(request, 3000, respdata, action)
        return resp
    try:
        conn = connectDB() 
        cursor = conn.cursor() 
        query = F"""
                    SELECT 
                    c.id,lc.userId,
                    c.title,c.description,
                    c.duration,
                    c.studentId AS students,
                    c.image,
                    c.price,
                    cat.categoryName AS category,
                    COALESCE(uc.isOwned, false) AS "isOwned",
                    COALESCE(lc.isLiked, false) AS "isLiked"
                    FROM t_courses c
                    INNER JOIN t_categories cat ON c.categoryid = cat.id
                    INNER JOIN t_user_courses uc ON c.id = uc.courseId AND uc.userId = 48
                    INNER JOIN t_liked_courses lc ON c.id = lc.courseId AND lc.userId = 48"""
        cursor.execute(query) 
        columns = cursor.description 
        respRow = [{columns[index][0]:column for index, 
            column in enumerate(value)} for value in cursor.fetchall()] 
        cursor.close() 
        respdata = respRow
        resp = sendResponse(request, 200, respdata, action) 
    except (Exception) as e:
        action = jsons["action"]
        respdata = [{"aldaa":str(e)}] 
        resp = sendResponse(request, 5000, respdata, action) 
        
    finally:
        disconnectDB(conn) 
        return resp 
# end dt_getusercourses

@csrf_exempt 
def coursecheckService(request): 
    if request.method == "OPTIONS":
        print("OPTIONS хүсэлт")
        return JsonResponse({"message": "Allowed methods: POST, GET"}, status=200)
    if request.method == "POST": 
        print("request")
        try:
            jsons = json.loads(request.body)
            print("jsons")
            print(jsons)
        except:
            action = "no action"
            respdata = [] 
            resp = sendResponse(request, 3003, respdata)
            return JsonResponse(resp) 
        try: 
            action = jsons["action"]
        except:
            action = "no action"
            respdata = [] 
            resp = sendResponse(request, 3005, respdata,action) 
            return JsonResponse(resp)
        
        if action == "getusercourses":
            result = dt_getusercourses(request)
            return JsonResponse(result)
        else:
            action = "no action"
            respdata = []
            resp = sendResponse(request, 3001, respdata, action)
            return JsonResponse(resp)
    else:
        action = "no action"
        respdata = []
        resp = sendResponse(request, 3002, respdata, action)
        return JsonResponse(resp)
    
