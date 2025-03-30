import { type MongoAbility } from "@casl/ability";

export type Role = "ADMIN" | "FINANCE" | "POLICE_OFFICER" | "POLICE_COMMANDER" | "POLICE_PRODUCTION" | "VERSIFICATION_OFFICER";

export type Actions = "create" | "read" | "update" | "delete" | "manage";

export type Subjects =
  | "all"
  | "user"
  | "manage"
  | "position"
  | "setting"
  | "folder"
  | "profile"
  | "company"
  | "dashboard"
  | "application"
  | "printing"
  | "renew"
  | "finance"
  | "complete"
  | "refund"
  | "village"
  | "scanner"
  | "take-photo"
  | "gallery"
  | "currency"
  | "exchange"
  | "report"

export type AppAbility = MongoAbility<[Actions, Subjects]>;
