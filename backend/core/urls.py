from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobPostingViewSet, job_posting_list, RegisterUser, ProfileView, ReviewViewSet, WorkHistoryViewSet, HandymenViewSet
from rest_framework.authtoken import views

router = DefaultRouter()
router.register(r'jobs', JobPostingViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'work-history', WorkHistoryViewSet)
router.register(r'handymen', HandymenViewSet, basename='handymen')

urlpatterns = [
    path('', include(router.urls)),
    path('job-postings/', job_posting_list, name='job_posting_list'),
    path('register/', RegisterUser.as_view(), name='register_user'),
    path('profile/', ProfileView.as_view(), name='user_profile'),
    path('login/', views.obtain_auth_token, name='api_token_auth'),
]
