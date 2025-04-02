
export type UserType = 'owner' | 'independent-agent' | 'medium-broker' | 'big-broker';
export type UserClassification = 'standard' | 'premium' | 'vip';
export type SelectionMethod = 'feed' | 'manual' | 'query';
export type NotificationType = 'golden' | 'standard';

export interface InventoryFilter {
  active: boolean;
  quantity: number;
}

export interface LeadsFilter {
  quantity: number;
  ageInDays: number;
}

export interface Notification {
  id?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  type: NotificationType;
  audience: {
    selectionMethod: SelectionMethod;
    userIds?: string[];
    userQuery?: string;
    userTypes?: UserType[];
    userClassifications?: UserClassification[];
  };
  filters?: {
    inventory?: InventoryFilter;
    leads?: LeadsFilter;
    zones?: string[];
  };
  createdAt?: Date;
  expiresAt?: Date;
  isActive?: boolean;
}
