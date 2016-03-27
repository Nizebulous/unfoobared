"""
API for the blog application
"""
from rest_framework import serializers, viewsets, filters
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from blog.models import BlogEntry


class BlogEntrySerializer(serializers.ModelSerializer):

    """
    Serializer for a `BlogEntry`
    """

    class Meta:
        model = BlogEntry


class BlogEntryViewSet(viewsets.ModelViewSet):

    """
    ViewSet for `BlogEntries`
    """

    queryset = BlogEntry.objects.filter(is_published=True)
    serializer_class = BlogEntrySerializer
    filter_backends = (filters.OrderingFilter, )
    ordering = ('-first_published_on', )

    def retrieve_with_slug(self, request, year, month, slug):
        """
        Retrieve a blog post given the year, month and title slug.
        """
        entry = get_object_or_404(
            self.get_queryset(),
            first_published_on__year=year,
            first_published_on__month=month,
            slug=slug)
        serializer = self.get_serializer(entry)
        return Response(serializer.data)
