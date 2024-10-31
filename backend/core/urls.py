from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobPostingViewSet, job_posting_list

router = DefaultRouter()
router.register(r'jobs', JobPostingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('job-postings/', job_posting_list, name='job_posting_list'),
]
