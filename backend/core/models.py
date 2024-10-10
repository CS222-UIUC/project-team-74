from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_handyman = models.BooleanField(default=False)
    reviews = models.TextField(blank=True, null=True)
    preferences = models.TextField(blank=True, null=True)

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
