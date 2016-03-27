"""
URL definition for blog application API
"""

from django.conf.urls import url

from blog.api import BlogEntryViewSet


urlpatterns = [
    url(r'^blog-entries/(?P<year>[0-9]{4})/(?P<month>[0-1][0-9])/(?P<slug>[a-zA-Z-]+)$',
        BlogEntryViewSet.as_view({'get': 'retrieve_with_slug'})),
    url(r'^blog-entries/$', BlogEntryViewSet.as_view({'get': 'list'})),
]
