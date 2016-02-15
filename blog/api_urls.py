"""
URL definition for blog application API
"""

from django.conf.urls import url

from blog.api import BlogEntryViewSet


urlpatterns = [
    url(r'^blog-entries/', BlogEntryViewSet.as_view()),
]
