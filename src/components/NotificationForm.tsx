
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Notification } from "@/types/notification";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface NotificationFormProps {
  notification: Notification;
  onChange: (notification: Partial<Notification>) => void;
}

const NotificationForm = ({ notification, onChange }: NotificationFormProps) => {
  const form = useForm({
    defaultValues: {
      title: notification.title,
      description: notification.description,
      ctaText: notification.ctaText,
      ctaLink: notification.ctaLink,
      type: notification.type,
    },
  });

  const handleChange = (key: keyof Notification, value: any) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Notification title"
          value={notification.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Keep it short and attention grabbing
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Detailed information about the notification"
          value={notification.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          Provide additional context about what this notification is for
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ctaText">Call to Action Text</Label>
        <Input
          id="ctaText"
          placeholder="E.g., Learn More, Get Started"
          value={notification.ctaText}
          onChange={(e) => handleChange("ctaText", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ctaLink">Call to Action Link</Label>
        <Input
          id="ctaLink"
          placeholder="https://example.com/page"
          value={notification.ctaLink}
          onChange={(e) => handleChange("ctaLink", e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          The URL where users will be directed when clicking the notification
        </p>
      </div>

      <div className="space-y-2">
        <Label>Notification Style</Label>
        <RadioGroup
          defaultValue={notification.type}
          onValueChange={(value) => handleChange("type", value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard" className="font-normal">
              Standard (Blue)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="golden" id="golden" />
            <Label htmlFor="golden" className="font-normal">
              Golden (Premium)
            </Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Golden notifications have higher visibility and are used for important announcements
        </p>
      </div>
    </div>
  );
};

export default NotificationForm;
