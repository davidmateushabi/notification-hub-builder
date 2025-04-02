
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";

interface NotificationsHistoryProps {
  notifications: Notification[];
  onViewDetails?: (notification: Notification) => void;
  onClone?: (notification: Notification) => void;
}

const NotificationsHistory = ({
  notifications,
  onViewDetails,
  onClone,
}: NotificationsHistoryProps) => {
  // Mock data for demonstration if no notifications are provided
  const demoNotifications: Notification[] = [
    {
      id: "1",
      title: "New property listing feature",
      description: "Check out our new property listing feature",
      ctaText: "Explore Now",
      ctaLink: "/features/property-listing",
      type: "standard",
      audience: { selectionMethod: "feed", userTypes: ["owner", "independent-agent"] },
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
      expiresAt: new Date(Date.now() + 86400000 * 5), // 5 days from now
      isActive: true,
    },
    {
      id: "2",
      title: "VIP Access: Premium Analytics",
      description: "Exclusive access to our new analytics dashboard",
      ctaText: "Access Now",
      ctaLink: "/premium/analytics",
      type: "golden",
      audience: { selectionMethod: "feed", userClassifications: ["vip", "premium"] },
      createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
      expiresAt: new Date(Date.now() + 86400000 * 2), // 2 days from now
      isActive: true,
    },
    {
      id: "3",
      title: "November Promotion Ending",
      description: "Last chance to take advantage of November special rates",
      ctaText: "Learn More",
      ctaLink: "/promotions/november",
      type: "standard",
      audience: { selectionMethod: "query", userQuery: "SELECT id FROM users WHERE last_login > '2023-10-01'" },
      createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
      expiresAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
      isActive: false,
    },
  ];

  const displayNotifications = notifications.length > 0 ? notifications : demoNotifications;

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="font-medium">{notification.title}</TableCell>
                <TableCell>
                  <Badge variant={notification.type === "golden" ? "default" : "secondary"} className={notification.type === "golden" ? "bg-amber-500" : ""}>
                    {notification.type === "golden" ? "Golden" : "Standard"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {notification.audience.selectionMethod === "feed" && "User Feed"}
                  {notification.audience.selectionMethod === "manual" && "Manual Selection"}
                  {notification.audience.selectionMethod === "query" && "SQL Query"}
                </TableCell>
                <TableCell>
                  {notification.createdAt
                    ? formatDistanceToNow(notification.createdAt, { addSuffix: true })
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {notification.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(notification)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onClone && onClone(notification)}
                    >
                      Clone
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {displayNotifications === demoNotifications && (
        <div className="text-sm text-muted-foreground italic text-center">
          This is demo data. Your created notifications will appear here.
        </div>
      )}
    </div>
  );
};

export default NotificationsHistory;
