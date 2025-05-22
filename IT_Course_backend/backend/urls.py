from django.urls import path
from appbackend import views, edituser,  course

urlpatterns = [
    path('user/', views.checkService),
    path('useredit/', edituser.editcheckService), 
    path('course/', course.coursecheckService), 
]
