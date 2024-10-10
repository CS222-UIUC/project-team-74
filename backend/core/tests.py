from django.test import TestCase
from .models import User, Job

class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="testuser", is_handyman=True)

    def test_user_creation(self):
        user = User.objects.get(username="testuser")
        self.assertEqual(user.is_handyman, True)

class JobTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(username="testuser")
        Job.objects.create(name="Fix Sink", description="Fix the kitchen sink.", location="Dorm 1", user=user)

    def test_job_creation(self):
        job = Job.objects.get(name="Fix Sink")
        self.assertEqual(job.description, "Fix the kitchen sink.")
