from django.urls import path,include
from .views import ArticleViewSet, UserViewSet
from rest_framework.routers import DefaultRouter




router = DefaultRouter()
router.register('articles',ArticleViewSet,basename='article')
router.register('users',UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    # path('articles/<int:id>', ArticleDetails.as_view())# name='article_list'),
    # # path('articles/<int:pk>', Article_detail),
    # # path('articles', Article_list),
]
