from rest_framework import serializers
from .models import Campaign, Subscriber


class CampaignSerialize(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = "__all__"


class SubscriberSerialize(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = "__all__"
