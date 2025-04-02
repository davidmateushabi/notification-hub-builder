
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationForm from "@/components/NotificationForm";
import AudienceSelector from "@/components/AudienceSelector";
import AdvancedFilters from "@/components/AdvancedFilters";
import NotificationsHistory from "@/components/NotificationsHistory";
import { Notification } from "@/types/notification";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [savedNotifications, setSavedNotifications] = useState<Notification[]>([]);
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
    // Save the notification with additional metadata
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(), // Generate a simple ID
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000 * 30), // 30 days from now
      isActive: true,
    };
    
    setSavedNotifications((prev) => [...prev, newNotification]);
    
    // Reset the form for a new notification
    setNotification({
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
    
    // Switch to history tab
    setActiveTab("history");
    
    toast.success("Notification created successfully!");
  };

  const handleCloneNotification = (notificationToClone: Notification) => {
    setNotification({
      ...notificationToClone,
      id: undefined,
      createdAt: undefined,
      expiresAt: undefined,
      isActive: undefined,
    });
    setActiveTab("basic");
    toast.info("Notification cloned. Make your changes and save to create a new notification.");
  };

  const handleViewDetails = (notificationToView: Notification) => {
    // In a real application, this would navigate to a details page or open a modal
    toast.info(`Viewing details for notification: ${notificationToView.title}`);
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="history">Notification History</TabsTrigger>
          <TabsTrigger value="basic">Create New Notification</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                View and manage all your created notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsHistory 
                notifications={savedNotifications} 
                onViewDetails={handleViewDetails} 
                onClone={handleCloneNotification} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Tabs defaultValue="notification" className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="notification">Basic Info</TabsTrigger>
                <TabsTrigger value="audience">Target Audience</TabsTrigger>
                <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
              </TabsList>

              <TabsContent value="notification" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
