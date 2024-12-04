from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from .models import JobPosting, Review, WorkHistory
from .serializers import JobPostingSerializer, UserSerializer, ReviewSerializer, WorkHistorySerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.http import JsonResponse
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from django.db.models import Avg

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

    def dashboard(self, request):
        job_postings = self.get_queryset()
        serializer = self.get_serializer(job_postings, many=True)
        return Response(serializer.data)

def job_posting_list(request):
    job_postings = JobPosting.objects.all()
    job_postings_data = JobPostingSerializer(job_postings, many=True).data
    return JsonResponse(job_postings_data, safe=False)


# Registration View
class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Profile View
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
       
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HandymenViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def list(self, request):
        users = User.objects.filter(is_handyman=True)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(written_by=self.request.user)

    # ex http://127.0.0.1:8000/api/reviews/averageRating/?pk=10
    @action(detail=False, methods=['get'], url_path='averageRating')
    def averageRating(self, request):
        pk = request.GET.get('pk')

        if pk is None:
            return Response({'error': 'No reviewed user specified'}, status=400)

        reviews = Review.objects.filter(reviewed_user=pk)
        
        if reviews.exists():
            avg_rating = reviews.aggregate(Avg('rating'))['rating__avg']
            return Response({'average_rating': avg_rating})
        else:
            return Response({'message': 'No reviews found for this user'}, status=404)

class WorkHistoryViewSet(viewsets.ModelViewSet):
    queryset = WorkHistory.objects.all()
    serializer_class = WorkHistorySerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()