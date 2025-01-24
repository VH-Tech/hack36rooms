from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host_key', 'allow_others_to_edit', 'created_at', 'announcements')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('host_key', 'allow_others_to_edit')

class AddAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('code', 'announcements')
