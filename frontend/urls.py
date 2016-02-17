"""
URL definition for the Frontend application
"""

from django.conf.urls import url

from frontend.views import blog_index, blog_detail


urlpatterns = [
    url(r'^blog/', blog_index),
    url(
        r'^blog/(?P<year>[0-9]{4})/(?P<month>[0-1][0-9])/(?P<day>[0-3][0-9])/(?P<slug>[a-zA-Z-])',
        blog_detail
    ),
]
