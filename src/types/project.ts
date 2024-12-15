import { TAddress } from "./profile";
import { TTag } from "./tag";

export type TProjectMemberFieldInput = {
  key: "member";
  index: number;
  subfield: keyof TProjectsMember;
};

export type TProjectsMember = {
  id?: number;
  project_id?: number;
  profile_id?: string;
  role_id?: string;
  experience?: string;
};

export type TProjects = {
  id?: number;
  owner?: string;
  title?: string;
  company?: string;
  start_date?: Date;
  end_date?: Date;
  types?: string;
  duration?: string; // "day" | "month" | "year";
  participation?: string; //"remote" | "onsite" | "hybrid";
  address?: TAddress;
  approval?: string; // "no" | "yes";
  member?: TProjectsMember[];
  description?: string;
  tags?: TTag[];
  salary?: number;
  priority?: string; // "high" | "medium" | "low";
  status?: string; // "pending" | "approved" | "rejected";
  created_at?: Date;
  updated_at?: Date;
};
