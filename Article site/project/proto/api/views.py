from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer, UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
# from django.shortcuts import render, HttpResponse
# from django.http import JsonResponse
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.decorators import APIView
# from rest_framework import generics
# from rest_framework import mixins


class ArticleViewSet(viewsets.ModelViewSet):
    queryset =Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



'''
class ArticleList(generics.GenericAPIView, mixins.ListModelMixin,
                  mixins.CreateModelMixin):
    queryset =Article.objects.all()
    serializer_class = ArticleSerializer

    def get(self, request):
        return self.list(request)
    
    def post(self,request):
        return self.create(request)
    


class ArticleDetails(generics.GenericAPIView, mixins.RetrieveModelMixin
                     ,mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset =Article.objects.all()
    serializer_class = ArticleSerializer

    lookup_field = 'id'

    def get(self, request, id):
        return self.retrieve(request, id)
    
    def put(self, request, id):
        return self.update(request, id)
    
    def delete(self, request, id):
        return self.destroy(request, id)
    




@api_view(['GET','POST'])
# Create your views here.
def Article_list(request):
    # get all articles
    if request.method =='GET':
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many = True)
        return Response(serializer.data)
    
    elif request.method =='POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def Article_detail(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    
    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'DELETE':
        article.delete()
        return Response(status.HTTP_204_NO_CONTENT)
'''
    




