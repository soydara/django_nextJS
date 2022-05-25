from django.shortcuts import render
from rest_framework import generics, response, status
from .models import Campaign
from .models import Subscriber
from .serializers import CampaignSerialize, SubscriberSerialize


# ListAPIView is use for list data get request
class CampaignListAPIView(generics.ListAPIView):
    serializer_class = CampaignSerialize

    def get_queryset(self):
        return Campaign.objects.all()


# GenericAPIView is use for detail data get request
class CampaignDetailAPIView(generics.GenericAPIView):
    serializer_class = CampaignSerialize

    def get(self, request, slug):
        query_set = Campaign.objects.filter(slug=slug).first()
        if query_set:
            return response.Response(self.serializer_class(query_set).data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


class SubscriberListAPIView(generics.ListAPIView):
    serializer_class = SubscriberSerialize

    def get_queryset(self):
        return Subscriber.objects.all()


# CreateAPIView use for create form post request
class SubscribeToCampaignAPIView(generics.CreateAPIView):
    serializer_class = SubscriberSerialize

    def get_queryset(self):
        return Subscriber.objects.all()
