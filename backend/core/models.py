from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    is_handyman = models.IntegerField(default=-1)
    user_reviews = models.TextField(blank=True, null=True)
    preferences = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, default="Champaign", blank=True)

    # Add related_name attributes to avoid conflicts with the built-in User model
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )

class JobPosting(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Link to the custom User model with on_delete set to SET_NULL for anonymous user handling
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='job_postings')
    
    def __str__(self):
        return f"{self.title} by {self.user.username if self.user else 'Anonymous'}"

# models.py

class WorkHistory(models.Model):
    job_posting = models.OneToOneField(JobPosting, on_delete=models.CASCADE)
    handyman = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='work_history')

    def __str__(self):
        return f"Work on {self.job_posting.title} by {self.handyman.username if self.handyman else 'N/A'}"


class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    written_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='written_reviews')
    reviewed_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=0)
    comment = models.TextField()

    def __str__(self):
        return f"Review by {self.written_by.username} - Rating: {self.rating}/10"
