from django.db import models
import re

class UserManager(models.Manager):
    def reg_validator(self, post_data):
        errors = {}
        if len(post_data["fname"]) < 2:
            errors['fname'] = "First Name must be at least 2 character!"
        if len(post_data['lname']) < 2:
            errors['lname'] = "Last Name must be at least 2 character!"
        email_regex = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if not email_regex.match(post_data['email']):
            errors['email'] = "Invalid email address!"
        if len(post_data['password']) < 8:
            errors['password'] = "Password must be at least 8 characters!"
        if post_data['password'] != post_data['confirm_password']:
            errors['confirm_password'] = "Passwords do not match!"
        return errors
        
    def login_validator(self, post_data):
        errors = {}
        email_regex = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if not email_regex.match(post_data['email']):
            errors['email'] = "Invalid email address!"
        if len(post_data['password']) < 8:
            errors['password'] = "Email or Password is incorrect please try again!"
        return errors

class User(models.Model):
    fname = models.CharField(max_length=23)
    lname = models.CharField(max_length=23)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()

################################

class TicketManager(models.Manager):
    def newticket_validator(self, post_data):
        errors = {}

        if len(post_data.get("status",[])) == 0:
            errors['status'] = "Please select a status."

        if len(post_data.get("issue_type",[])) == 0:
            errors['issue_type'] = "Please select an issue type."

        if len(post_data["comment"]) < 5:
            errors['comment'] = "Comment must be at least 5 characters."

        if len(post_data.get("priority_level",[])) == 0:
            errors['priority_level'] = "Please select a priority level."
        
        return errors

    def editticket_validator(self, post_data):
        errors = {}

        if len(post_data.get("status",[])) == 0:
            errors['status'] = "Please select a status."

        if len(post_data.get("issue_type",[])) == 0:
            errors['issue_type'] = "Please select an issue type."

        if len(post_data["comment"]) < 5:
            errors['comment'] = "Comment cannot be empty."

        if len(post_data.get("priority_level",[])) == 0:
            errors['priority_level'] = "Please select a priority level."
        
        return errors

class Ticket(models.Model):
    status = models.CharField(max_length=255)
    issue_type = models.CharField(max_length=255)
    comment = models.CharField(max_length=255)
    priority_level = models.CharField(max_length=255)
    assigned_to = models.ForeignKey(User, related_name="tickets", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = TicketManager()