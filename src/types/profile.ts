import { TRoleUser } from "./role";
import { TTag } from "./tag";

export type TAddressFieldInputProfile =
  | "address.street"
  | "address.city"
  | "address.state"
  | "address.zip_code";
export type TSocialLinksFieldInputProfile = {
  key: "social_links";
  id: number;
  subfield: keyof TSocialLinks;
};

export type TSocialLinks = {
  id?: number;
  name?: string;
  icon?: any;
  link?: string;
  is_exist?: boolean;
};

export type TExperience = {
  value: string;
  label: string;
};

export type TAddress = {
  street?: string;
  city?: string;
  state?: string;
  zip_code?: number;
};

export type TProfileUser = {
  _id?: string;
  user_id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: number;
  birthday?: Date;
  address?: TAddress;
  profile_picture?: string;
  profile_cover?: string;
  role?: TRoleUser;
  experience?: TExperience;
  tags?: TTag[];
  about?: string;
  social_links?: TSocialLinks[];
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

// MODAL HELPER
export type TProfileModalState = {
  profileInfo: boolean;
  profilePicture: boolean;
  profileCover: boolean;
};

// RESPONSE
export type TProfileLoggedInResponse = {
  status: any;
  message: string;
  data?: TProfileUser;
  error?: string;
  statusCode?: number;
};

export type TGetAllProfileResponse = {
  status: any;
  message: string;
  data?: TProfileUser[];
  error?: string;
  statusCode?: number;
};

export type TProfileUpdateResponse = {
  status: number;
  message: string;
  data?: TProfileUser;
  error?: string;
  statusCode?: number;
};
