"""
Admin definition for the blog application
"""

from django.contrib import admin
from blog.models import BlogEntry


@admin.register(BlogEntry)
class BlogEntryAdmin(admin.ModelAdmin):
    """
    Admin object for a BlogEntry
    """
    pass
