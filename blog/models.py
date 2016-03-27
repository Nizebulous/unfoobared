"""
Data models for the blog application
"""

from __future__ import unicode_literals

from django.db import models


class BlogEntry(models.Model):

    """
    Data Model for a Blog Entry
    """

    title = models.CharField(max_length=256, unique=True)
    slug = models.CharField(max_length=256, unique=True)
    post = models.TextField()
    short = models.TextField()
    is_published = models.BooleanField(default=False)
    first_published_on = models.DateTimeField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
