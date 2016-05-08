"""
URL definition for the Frontend application
"""

from django.conf.urls import url
from django.views.generic import RedirectView

from frontend.views import blog_index, blog_detail, about_me, projects


urlpatterns = [
    url(r'^$', RedirectView.as_view(url='/blog/')),
    url(
        r'^blog/(?P<year>[0-9]{4})/(?P<month>[0-1][0-9])/(?P<slug>[a-zA-Z-]+)',
        blog_detail,
        name='blog-detail'
    ),
    url(r'^blog/', blog_index, name='blog-index'),
    url(r'^projects/', projects, name='blog-index'),
    url(r'^about/', about_me, name='about-me'),
]
