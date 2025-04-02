
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Notification } from "@/types/notification";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AdvancedFiltersProps {
  filters?: Notification["filters"];
  onChange: (filters: Notification["filters"]) => void;
}

// Mock data for zones
const availableZones = [
  { id: "north", name: "North Region" },
  { id: "south", name: "South Region" },
  { id: "east", name: "East Region" },
  { id: "west", name: "West Region" },
  { id: "central", name: "Central Region" },
];

const AdvancedFilters = ({ filters = {}, onChange }: AdvancedFiltersProps) => {
  const handleInventoryActiveChange = (active: boolean) => {
    onChange({
      ...filters,
      inventory: {
        ...filters.inventory,
        active,
        quantity: filters.inventory?.quantity || 1,
      },
    });
  };

  const handleInventoryQuantityChange = (quantity: number) => {
    onChange({
      ...filters,
      inventory: {
        ...filters.inventory,
        active: filters.inventory?.active || false,
        quantity,
      },
    });
  };

  const handleLeadsQuantityChange = (quantity: number) => {
    onChange({
      ...filters,
      leads: {
        ...filters.leads,
        quantity,
        ageInDays: filters.leads?.ageInDays || 30,
      },
    });
  };

  const handleLeadsAgeChange = (ageInDays: number) => {
    onChange({
      ...filters,
      leads: {
        ...filters.leads,
        ageInDays,
        quantity: filters.leads?.quantity || 1,
      },
    });
  };

  const handleZoneChange = (zoneId: string) => {
    const currentZones = filters.zones || [];
    let updatedZones;
    
    if (currentZones.includes(zoneId)) {
      updatedZones = currentZones.filter((id) => id !== zoneId);
    } else {
      updatedZones = [...currentZones, zoneId];
    }
    
    onChange({
      ...filters,
      zones: updatedZones.length > 0 ? updatedZones : undefined,
    });
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="inventory">
          <AccordionTrigger>Inventory Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="inventoryActive" className="font-normal">
                  Filter by active inventory
                </Label>
                <Switch
                  id="inventoryActive"
                  checked={filters.inventory?.active || false}
                  onCheckedChange={handleInventoryActiveChange}
                />
              </div>
              
              {filters.inventory?.active && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="inventoryQuantity">
                      Minimum inventory quantity
                    </Label>
                    <span className="text-sm">
                      {filters.inventory?.quantity || 1}
                    </span>
                  </div>
                  <Slider
                    id="inventoryQuantity"
                    defaultValue={[filters.inventory?.quantity || 1]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleInventoryQuantityChange(value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Users must have at least this many active inventory items
                  </p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="leads">
          <AccordionTrigger>Leads Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="leadsQuantity">Minimum leads quantity</Label>
                  <span className="text-sm">{filters.leads?.quantity || 1}</span>
                </div>
                <Slider
                  id="leadsQuantity"
                  defaultValue={[filters.leads?.quantity || 1]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleLeadsQuantityChange(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Users must have at least this many leads
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="leadsAge">Maximum leads age (days)</Label>
                  <span className="text-sm">{filters.leads?.ageInDays || 30} days</span>
                </div>
                <Slider
                  id="leadsAge"
                  defaultValue={[filters.leads?.ageInDays || 30]}
                  min={1}
                  max={365}
                  step={1}
                  onValueChange={(value) => handleLeadsAgeChange(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Only consider leads received within this time period
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="zones">
          <AccordionTrigger>Zone Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select zones to target users in specific geographic regions
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableZones.map((zone) => (
                  <div className="flex items-center space-x-2" key={zone.id}>
                    <Switch
                      id={`zone-${zone.id}`}
                      checked={(filters.zones || []).includes(zone.id)}
                      onCheckedChange={() => handleZoneChange(zone.id)}
                    />
                    <Label htmlFor={`zone-${zone.id}`} className="font-normal">
                      {zone.name}
                    </Label>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground">
                If no zones are selected, users from all zones will be targeted
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AdvancedFilters;
