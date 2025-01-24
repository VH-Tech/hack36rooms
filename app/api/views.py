from django.shortcuts import redirect, render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, AddAnnouncementSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from rest_framework.parsers import FileUploadParser
from django.core.files.storage import FileSystemStorage
from django.contrib import messages
import os
# Create your views here.

def Login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return redirect("/")


    return render(request, 'login.html')


def FileUpload(request):
    context = {}
    lookup_url_kwarg_code = 'code'
    if request.method == 'POST':
        print(request)
        uploaded_file = request.FILES['file']
        code = request.GET.get('code')
        context['code'] = request.GET.get('code')
        context['is_host'] = request.GET.get('isHost')
        fs = FileSystemStorage('static/files_storage/'+code)
        name = fs.save(uploaded_file.name, uploaded_file)
        messages.success(request, 'Your file has been submitted!')
        context['url'] = fs.url('static/files_storage/'+code+'/'+name)
        path = 'static/files_storage/'+code
        file_list =os.listdir(path)
        context['file_list'] = file_list

    if request.method == 'GET':
        context['code'] = request.GET.get('code')
        context['is_host'] = request.GET.get('isHost')
        code = request.GET.get('code')
        path = 'static/files_storage/'+code
        isdir = os.path.isdir(path)
        if isdir:
            file_list =os.listdir(path)
            context['file_list'] = file_list
        else:
            context['file_list'] = []


    return render(request, 'upload.html', context)


# class FileUploadView(APIView):

#     parser_classes = (FileUploadParser, )
#     def post(self, request, format=None):

#         up_file = request.FILES['file']
#         destination = open(up_file.name, 'wb+')
#         for chunk in up_file.chunks():
#             destination.write(chunk)
#         destination.close()  # File should be closed only after all chuns are added
#         return Response(up_file.name, status.HTTP_200_OK)



class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer




class GetUser(APIView):
    serializer_class = RoomSerializer

    def get(self, request, format=None):
       return Response(str(request.user), status=status.HTTP_200_OK)
            





class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg_code = 'code'
    lookup_url_kwarg_host_key = 'host_key'

    def get(self, request, format=None):
        print(request)
        code = request.GET.get(self.lookup_url_kwarg_code)
        host_key = request.GET.get(self.lookup_url_kwarg_host_key)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                print(data)
                data['is_host'] = host_key == room[0].host_key

                jsonDec = json.decoder.JSONDecoder()
                myPythonList = jsonDec.decode(data['announcements'])
                myPythonList.reverse()

                data['announcements'] = json.dumps(myPythonList)
                

                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request code not found': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        print(request.data)
        if serializer.is_valid():
            allow_others_to_edit= serializer.data.get('allow_others_to_edit')
            host_key = serializer.data.get('host_key')
            room = Room(host_key=host_key, allow_others_to_edit=allow_others_to_edit)          
            room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        print(serializer.errors)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class AddAnnouncement(APIView):
    lookup_url_kwarg_code = 'code'
    lookup_url_kwarg_announ = 'announ'

    def post(self, request, format=None):
        
        code = request.data.get(self.lookup_url_kwarg_code)
        announ = request.data.get(self.lookup_url_kwarg_announ)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]

                jsonDec = json.decoder.JSONDecoder()
                myPythonList = jsonDec.decode(room.announcements)
                myPythonList.append(announ)

                room.announcements = json.dumps(myPythonList)
                room.save(update_fields=['announcements'])
                myPythonList.reverse()
                return Response({'announs': json.dumps(myPythonList)}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


