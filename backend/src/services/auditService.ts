import { query } from '../database/connection';
import { AuditLog } from '../types';

export const logAction = async (
  userId: number,
  action: string,
  entityType: string,
  entityId: number | null,
  oldValues: Record<string, any> | null,
  newValues: Record<string, any> | null,
  ipAddress: string | null
): Promise<void> => {
  await query(
    `INSERT INTO audit_log (user_id, action, entity_type, entity_id, old_values, new_values, ip_address)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      userId,
      action,
      entityType,
      entityId,
      oldValues ? JSON.stringify(oldValues) : null,
      newValues ? JSON.stringify(newValues) : null,
      ipAddress,
    ]
  );
};

export const getAuditLog = async (
  limit: number = 100,
  offset: number = 0,
  userId?: number
): Promise<AuditLog[]> => {
  let queryText = `
    SELECT al.*, u.username as user_username
    FROM audit_log al
    LEFT JOIN users u ON al.user_id = u.id
  `;

  const params: any[] = [];
  
  if (userId) {
    queryText += ' WHERE al.user_id = $1';
    params.push(userId);
  }

  queryText += ' ORDER BY al.timestamp DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
  params.push(limit, offset);

  const result = await query(queryText, params);

  return result.rows;
};
