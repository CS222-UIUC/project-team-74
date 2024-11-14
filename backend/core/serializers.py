from rest_framework import serializers
from .models import JobPosting, Review, WorkHistory
from django.contrib.auth import get_user_model

User = get_user_model()

class JobPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = ['id', 'title', 'description', 'location', 'price']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'location', 'is_handyman']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Create a new user and set the password correctly
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            location=validated_data.get('location', ''),
            is_handyman=-1  # Set default value to -1
        )
        return user
    
class WorkHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkHistory
        fields = ['job_posting', 'handyman']


class ReviewSerializer(serializers.ModelSerializer):
    written_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    reviewed_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Review
        fields = ['review_id', 'written_by', 'reviewed_user', 'rating', 'comment']
