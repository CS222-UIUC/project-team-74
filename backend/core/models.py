from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    is_handyman = models.IntegerField(default=-1)
    reviews = models.TextField(blank=True, null=True)
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
