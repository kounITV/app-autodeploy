/* eslint-disable @typescript-eslint/naming-convention */
import { type Actions, type Role, type Subjects } from "./interface";

export const rolePermissions: Record<Role, Array<{ action: Actions; subject: Subjects | Subjects[] }>> = {
  ADMIN: [{ action: "manage", subject: "all" }],
  FINANCE: [
    { action: "read", subject: "folder" },
    { action: "read", subject: "setting" },
    { action: "read", subject: "dashboard" },
    { action: "read", subject: "finance" },
    { action: "read", subject: "refund" },
    { action: "read", subject: "report" },
  ],
  POLICE_OFFICER: [
    { action: "read", subject: "setting" },
    { action: "read", subject: "folder" },
    { action: "read", subject: "dashboard" },
    { action: "read", subject: "position" },
    { action: "read", subject: "profile" },
    { action: "read", subject: "application" },
    { action: "read", subject: "company" },
    { action: "read", subject: "renew" },
    { action: "read", subject: "village" },
  ],
  POLICE_COMMANDER: [],
  POLICE_PRODUCTION: [
    { action: "read", subject: "dashboard" },
    { action: "read", subject: "printing" },
    { action: "read", subject: "folder" },
  ],
  VERSIFICATION_OFFICER: [
    { action: "read", subject: "scanner" },
  ],
};
