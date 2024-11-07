from rest_framework import serializers
from .models import JobPosting
from django.contrib.auth import get_user_model

User = get_user_model()

class JobPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = ['id', 'title', 'description', 'location', 'price']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','email', 'password', 'location', 'is_handyman']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Create a new user and set the password correctly
        user = User.objects.create_user(
            username=validated_data['username'],
            email = validated_data['email'],
            password=validated_data['password'],
            location=validated_data.get('location', ''),
            is_handyman=validated_data.get('is_handyman', False)
        )
        return user