
import React from "react";
import { Notification } from "@/types/notification";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface NotificationPreviewProps {
  notification: Notification;
}

const NotificationPreview = ({ notification }: NotificationPreviewProps) => {
  // Helper function to get notification class based on type
  const getNotificationClass = () => {
    return notification.type === "golden" 
      ? "notification-golden" 
      : "notification-standard";
  };

  return (
    <div className="space-y-6">
      {/* Header preview */}
      <div className="border rounded-md p-2 bg-background shadow-sm">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500"></span>
          </Button>
        </div>
      </div>
      
      {/* Notification dropdown preview */}
      <div className="border rounded-md p-4 bg-popover shadow-md">
        <div className={`notification-preview ${getNotificationClass()}`}>
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="font-medium mb-1">
                {notification.title || "Notification Title"}
              </h3>
              <p className="text-sm opacity-90 mb-3">
                {notification.description || "Notification description will appear here"}
              </p>
              {notification.ctaText && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={notification.type === "golden" ? "bg-amber-300 hover:bg-amber-400 border-amber-400" : ""}
                >
                  {notification.ctaText}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          <p>This is how your notification will appear to users</p>
        </div>
      </div>
      
      {/* Audience summary */}
      <div className="border rounded-md p-4 bg-muted/50">
        <h3 className="font-medium text-sm mb-2">Audience Summary:</h3>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>
            • Selection method: {notification.audience.selectionMethod || "Not specified"}
          </li>
          <li>
            • User types: {notification.audience.userTypes?.length 
                ? notification.audience.userTypes.join(", ") 
                : "All types"}
          </li>
          <li>
            • User classifications: {notification.audience.userClassifications?.length 
                ? notification.audience.userClassifications.join(", ") 
                : "All classifications"}
          </li>
          {notification.audience.selectionMethod === "query" && notification.audience.userQuery && (
            <li>• Using custom query for user selection</li>
          )}
          {notification.filters?.inventory && (
            <li>• With inventory filters applied</li>
          )}
          {notification.filters?.leads && (
            <li>• With leads filters applied</li>
          )}
          {notification.filters?.zones && notification.filters.zones.length > 0 && (
            <li>• Targeted zones: {notification.filters.zones.join(", ")}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationPreview;
