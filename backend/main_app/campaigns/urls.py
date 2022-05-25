from django.urls import path
from .views import CampaignListAPIView, CampaignDetailAPIView, SubscriberListAPIView, SubscribeToCampaignAPIView

urlpatterns = [
    path('campaigns', CampaignListAPIView.as_view(), name="campaigns"),
    path('campaigns/<str:slug>', CampaignDetailAPIView.as_view(), name="campaigns-detail"),
    path('subscriber', SubscriberListAPIView.as_view(), name="subscriber"),
    path('campaigns-subscriber', SubscribeToCampaignAPIView.as_view(), name="campaigns-subscriber"),
]
