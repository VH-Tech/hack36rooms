from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, Login, GetUser, AddAnnouncement, FileUpload

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('get-user', GetUser.as_view()),
    path('add-announcement', AddAnnouncement.as_view()),
    path('login', Login),
    path('upload-file', FileUpload ),
    
]
