import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";

export const searchResultValidation = <T>({
  data,
  inputKey,
  isInputFocused,
  currentItemType,
  item,
}: {
  data: any;
  inputKey: string;
  isInputFocused: { [key: string]: boolean };
  currentItemType: string;
  item: T;
}) => {
  if (!data) {
    console.error("Invalid data.");
    return false;
  }
  if (!inputKey || !isInputFocused[inputKey]) {
    console.error("Invalid input key or focus state.");
    return false;
  }
  if (currentItemType === "role" && !(item as TRoleUser)._id) {
    console.error("Invalid role item selected.");
    return false;
  }
  if (currentItemType === "tags" && !(item as TTag).name) {
    console.error("Invalid tag item selected.");
    return false;
  }

  return true;
};
