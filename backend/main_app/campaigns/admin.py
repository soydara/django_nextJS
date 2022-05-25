from django.contrib import admin
from .models import Campaign, Subscriber


# custom show list data in admin panel
class CampaignModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_per_page = 1


# custom show list data in admin panel
class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ('email', 'campaign', 'created_at')
    search_fields = ('email', 'campaign__title', 'created_at')  # campaign__title call modal title from campaign
    list_per_page = 10


# register modal table in admin panel
admin.site.register(Campaign, CampaignModelAdmin)
admin.site.register(Subscriber, SubscriberModelAdmin)
