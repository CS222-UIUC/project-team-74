from django.contrib import admin
from .models import User, JobPosting, WorkHistory, Review

# Register your models here
admin.site.register(User)
admin.site.register(JobPosting)
admin.site.register(WorkHistory)
admin.site.register(Review)