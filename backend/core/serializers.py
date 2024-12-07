from rest_framework import serializers
from .models import JobPosting, Review, WorkHistory
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'location', 'is_handyman', 'details', 'specialty', 'profile_image']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.location = validated_data.get('location', instance.location)
        instance.is_handyman = validated_data.get('is_handyman', instance.is_handyman)
        instance.specialty = validated_data.get('specialty', instance.specialty)
        instance.details = validated_data.get('details', instance.details)

        if 'profile_image' in validated_data:
            profile_image = validated_data.pop('profile_image')
            if profile_image:
                instance.profile_image = profile_image
            elif profile_image is None:
                instance.profile_image.delete(save=False)

        instance.save()
        return instance

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
    
    def get_profile_image(self, obj):
        request = self.context.get('request')
        if obj.profile_image and request:
            return request.build_absolute_uri(obj.profile_image.url)
        return None
    

class JobPostingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = JobPosting
        fields = ['id', 'title', 'description', 'location', 'price', 'coordinates', 'created_at', 'status', 'user']

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
