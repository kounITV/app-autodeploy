import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import {
  type Actions,
  type AppAbility,
  type Role,
  type Subjects,
} from "../../setting/interface";
import { rolePermissions } from "../../setting/permissions";

function parseConditions(
  conditions: Record<string, unknown>,
  userId: string,
): Record<string, unknown> {
  return JSON.parse(JSON.stringify(conditions).replace("${user.id}", userId));
}

interface HandleSubjectOptions {
  action: Actions;
  subject: Subjects;
  conditions?: Record<string, unknown>;
  can: (action: Actions, subject: Subjects, conditions?: Record<string, unknown>) => void;
}

function handleSubject(options: HandleSubjectOptions): void {
  const { action, subject, conditions, can } = options;
  can(action, subject, conditions);
}

interface HandlePermissionOptions {
  permission: {
    action: Actions;
    subject: Subjects | Subjects[];
    conditions?: Record<string, unknown>;
  };
  userId: string;
  can: (action: Actions, subject: Subjects, conditions?: Record<string, unknown>) => void;
}

function handlePermission(options: HandlePermissionOptions): void {
  const { permission, userId, can } = options;
  const conditions = permission.conditions
    ? parseConditions(permission.conditions, userId)
    : undefined;

  if (Array.isArray(permission.subject)) {
    permission.subject.forEach((subject) => {
      handleSubject({ action: permission.action, subject, conditions, can });
    });
  } else {
    handleSubject({ action: permission.action, subject: permission.subject, conditions, can });
  }
}

function applyPermissions(
  role: Role,
  userId: string,
  can: (action: Actions, subject: Subjects, conditions?: Record<string, unknown>) => void,
) {
  const permissions = rolePermissions[role];
  if (permissions) {
    permissions.forEach((permission) => {
      handlePermission({ permission, userId, can });
    });
  }
}

export function defineAbilityFor(role: Role, userId: string): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
  applyPermissions(role, userId, can);
  return build();
}