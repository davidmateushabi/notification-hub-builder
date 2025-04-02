
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Notification, UserClassification, UserType } from "@/types/notification";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

interface AudienceSelectorProps {
  audience: Notification["audience"];
  onChange: (audience: Notification["audience"]) => void;
}

const userTypeOptions: { value: UserType; label: string }[] = [
  { value: "owner", label: "Property Owner" },
  { value: "independent-agent", label: "Independent Agent" },
  { value: "medium-broker", label: "Medium Broker" },
  { value: "big-broker", label: "Big Broker" },
];

const userClassificationOptions: { value: UserClassification; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "vip", label: "VIP" },
];

const AudienceSelector = ({ audience, onChange }: AudienceSelectorProps) => {
  const [manualUserIds, setManualUserIds] = useState<string>("");
  
  const handleSelectionMethodChange = (method: string) => {
    onChange({
      ...audience,
      selectionMethod: method as Notification["audience"]["selectionMethod"],
    });
  };
  
  const handleUserTypeChange = (type: UserType, checked: boolean) => {
    let updatedTypes = [...(audience.userTypes || [])];
    
    if (checked) {
      updatedTypes.push(type);
    } else {
      updatedTypes = updatedTypes.filter((t) => t !== type);
    }
    
    onChange({
      ...audience,
      userTypes: updatedTypes,
    });
  };
  
  const handleUserClassificationChange = (
    classification: UserClassification,
    checked: boolean
  ) => {
    let updatedClassifications = [...(audience.userClassifications || [])];
    
    if (checked) {
      updatedClassifications.push(classification);
    } else {
      updatedClassifications = updatedClassifications.filter(
        (c) => c !== classification
      );
    }
    
    onChange({
      ...audience,
      userClassifications: updatedClassifications,
    });
  };
  
  const handleManualUserIdsChange = (value: string) => {
    setManualUserIds(value);
    // Convert comma-separated string to array of strings
    const userIdArray = value
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    
    onChange({
      ...audience,
      userIds: userIdArray.length > 0 ? userIdArray : undefined,
    });
  };
  
  const handleUserQueryChange = (query: string) => {
    onChange({
      ...audience,
      userQuery: query || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Selection Method</Label>
        <RadioGroup
          value={audience.selectionMethod}
          onValueChange={handleSelectionMethodChange}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="feed" id="feed" />
            <Label htmlFor="feed" className="font-normal">
              User Feed (Filtered)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual" className="font-normal">
              Manual (Selected User IDs)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="query" id="query" />
            <Label htmlFor="query" className="font-normal">
              Custom Query
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {audience.selectionMethod === "feed" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="user-types">
            <AccordionTrigger>User Types</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2">
                {userTypeOptions.map((option) => (
                  <div className="flex items-center space-x-2" key={option.value}>
                    <Checkbox
                      id={`type-${option.value}`}
                      checked={audience.userTypes?.includes(option.value) || false}
                      onCheckedChange={(checked) =>
                        handleUserTypeChange(option.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`type-${option.value}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
                <p className="text-sm text-muted-foreground mt-2">
                  If none selected, notification will be sent to all user types
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="user-classifications">
            <AccordionTrigger>User Classifications</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2">
                {userClassificationOptions.map((option) => (
                  <div className="flex items-center space-x-2" key={option.value}>
                    <Checkbox
                      id={`classification-${option.value}`}
                      checked={
                        audience.userClassifications?.includes(option.value) || false
                      }
                      onCheckedChange={(checked) =>
                        handleUserClassificationChange(
                          option.value,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`classification-${option.value}`}
                      className="font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
                <p className="text-sm text-muted-foreground mt-2">
                  If none selected, notification will be sent to all classifications
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {audience.selectionMethod === "manual" && (
        <div className="space-y-2">
          <Label htmlFor="userIds">User IDs</Label>
          <Textarea
            id="userIds"
            placeholder="Enter user IDs separated by commas (e.g., user1, user2, user3)"
            value={manualUserIds}
            onChange={(e) => handleManualUserIdsChange(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            Enter the specific user IDs that should receive this notification
          </p>
        </div>
      )}
      
      {audience.selectionMethod === "query" && (
        <div className="space-y-2">
          <Label htmlFor="userQuery">SQL Query</Label>
          <Textarea
            id="userQuery"
            placeholder="SELECT id FROM users WHERE..."
            value={audience.userQuery || ""}
            onChange={(e) => handleUserQueryChange(e.target.value)}
            className="min-h-[150px] font-mono text-sm"
          />
          <p className="text-sm text-muted-foreground">
            Enter a SQL query that returns user IDs. The query should return a column
            named "id".
          </p>
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;
