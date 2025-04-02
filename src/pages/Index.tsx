
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationForm from "@/components/NotificationForm";
import NotificationPreview from "@/components/NotificationPreview";
import AudienceSelector from "@/components/AudienceSelector";
import AdvancedFilters from "@/components/AdvancedFilters";
import { Notification } from "@/types/notification";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell } from "lucide-react";

const Index = () => {
  const [notification, setNotification] = useState<Notification>({
    title: "",
    description: "",
    ctaText: "Learn More",
    ctaLink: "",
    type: "standard",
    audience: {
      selectionMethod: "feed",
      userTypes: [],
      userClassifications: [],
    },
  });

  const handleNotificationChange = (updatedNotification: Partial<Notification>) => {
    setNotification((prev) => ({ ...prev, ...updatedNotification }));
  };

  const handleAudienceChange = (audienceData: Notification["audience"]) => {
    setNotification((prev) => ({
      ...prev,
      audience: { ...prev.audience, ...audienceData },
    }));
  };

  const handleFiltersChange = (filters: Notification["filters"]) => {
    setNotification((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }));
  };

  const handleSubmit = () => {
    // Here we would typically send the notification to an API
    console.log("Notification to be saved:", notification);
    toast.success("Notification created successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <div className="flex items-center space-x-4">
          <Bell className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notification Hub Builder</h1>
            <p className="text-muted-foreground">
              Create and manage notifications for your users
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="audience">Target Audience</TabsTrigger>
              <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Details</CardTitle>
                  <CardDescription>
                    Configure how your notification will appear to users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NotificationForm 
                    notification={notification} 
                    onChange={handleNotificationChange} 
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Target Audience</CardTitle>
                  <CardDescription>
                    Select which users will receive this notification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AudienceSelector 
                    audience={notification.audience} 
                    onChange={handleAudienceChange} 
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="filters" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Filters</CardTitle>
                  <CardDescription>
                    Further refine your audience with additional criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdvancedFilters 
                    filters={notification.filters} 
                    onChange={handleFiltersChange} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button 
              size="lg" 
              className="w-full" 
              onClick={handleSubmit}
              disabled={!notification.title || !notification.description}
            >
              Create Notification
            </Button>
          </div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your notification will appear to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationPreview notification={notification} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
