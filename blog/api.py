"""
API for the blog application
"""

from rest_framework import serializers
from rest_framework import viewsets

from blog.models import BlogEntry


class BlogEntrySerializer(serializers.ModelSerializer):

    """
    Serializer for a `BlogEntry`
    """

    class Meta:
        model = BlogEntry


class BlogEntryViewSet(viewsets.ReadOnlyModelViewSet):

    """
    ViewSet for `BlogEntries`
    """

    queryset = BlogEntry.objects.filter(published=True)
    serializer_class = BlogEntrySerializer
