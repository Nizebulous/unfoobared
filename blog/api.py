"""
API for the blog application
"""

from rest_framework import serializers, generics, filters

from blog.models import BlogEntry


class BlogEntrySerializer(serializers.ModelSerializer):

    """
    Serializer for a `BlogEntry`
    """

    class Meta:
        model = BlogEntry


class BlogEntryViewSet(generics.ListAPIView):

    """
    ViewSet for `BlogEntries`
    """

    queryset = BlogEntry.objects.filter(is_published=True)
    serializer_class = BlogEntrySerializer
    filter_backends = (filters.OrderingFilter, )
    ordering = ('-first_published_on', )
