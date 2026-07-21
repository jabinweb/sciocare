/**
 * SYSTEM REGISTRY OF CAPABILITIES
 *
 * These strings are the source of truth for all permissions across the system.
 * They must match the strings used in the UI's Access Control Policy table.
 */
export const AVAILABLE_CAPABILITIES = [
  'View Dashboard',
  'Access Content',
  'Manage Content',
  'View Programs',
  'Manage Batches',
  'Manage Users',
  'View Analytics',
  'Manage Settings',
  'Role Management',
  'System Logs',
] as const;

export type SystemCapability = (typeof AVAILABLE_CAPABILITIES)[number];

/**
 * DEFAULT CONFIGURATION
 *
 * Sciocare uses USER (not STUDENT) as the learner role.
 */
export const DEFAULT_RBAC_CONFIG: Record<string, string[]> = {
  ADMIN: [...AVAILABLE_CAPABILITIES],
  MODERATOR: [
    'View Dashboard',
    'Manage Users',
    'Manage Batches',
    'View Analytics',
    'View Programs',
  ],
  TEACHER: [
    'View Dashboard',
    'View Programs',
    'Manage Batches',
    'View Analytics',
  ],
  USER: ['View Dashboard', 'Access Content'],
};
