from rest_framework import viewsets
from .models import JobPosting
from .serializers import JobPostingSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            if self.request.user.is_authenticated:
                # Save with the authenticated user
                serializer.save(user=self.request.user)
            else:
                # Use or create an anonymous user for unauthenticated users
                anonymous_user, created = User.objects.get_or_create(username='anonymous')
                serializer.save(user=anonymous_user)
        except IntegrityError as e:
            # Log or print the error if there's an IntegrityError
            print("Error in perform_create:", e)
            raise
