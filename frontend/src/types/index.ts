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
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuditLogEntry {
  id: number;
  action: string;
  entity_type: string;
  timestamp: string;
  user_username: string;
  old_values?: any;
  new_values?: any;
}

export interface User {
  id: number;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
