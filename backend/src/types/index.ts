export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface SecurityItem {
  id: string;
  title: string;
  severity: Severity;
  timestamp: string;
  source?: string;
  category?: string;
  asset?: string;
  type?: string;
  link?: string;
}

export interface DashboardData {
  elastic: SecurityItem[] | { error: string };
  defender: SecurityItem[] | { error: string };
  opencti: SecurityItem[] | { error: string };
  tenable: SecurityItem[] | { error: string };
  rss: SecurityItem[] | { error: string };
}

export interface Config {
  id?: number;
  service_name: string;
  service_type: string;
  url?: string;
  api_key?: string;
  token?: string;
  additional_params?: Record<string, any>;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id?: number;
  username: string;
  password_hash?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuditLog {
  id?: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id?: number;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  timestamp?: Date;
}

export interface JWTPayload {
  userId: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
