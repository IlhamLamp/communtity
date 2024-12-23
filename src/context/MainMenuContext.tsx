import { ProjectDefaultData } from "@/data/project.default";
import { TProjectMemberFieldInput, TProjects } from "@/types/project";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePublicResource } from "./PublicContext";
import { TAddress, TAddressFieldInputProfile } from "@/types/profile";
import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";

type ItemDataType = TProjects;
type PublicItemType = "role" | "tags";

interface MainMenuContextProps {
  loadFileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDurationDate: (date: Date | null, field: string) => void;
  previewImgSrc: string;
  setPreviewImgSrc: React.Dispatch<React.SetStateAction<string>>;
  itemData: ItemDataType;
  setItemData: React.Dispatch<React.SetStateAction<ItemDataType>>;
}

const MainMenuContext = createContext<MainMenuContextProps | undefined>(
  undefined
);

export const MainMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // context
  const { roles, tags } = usePublicResource();

  // shared-state
  const [previewImgSrc, setPreviewImgSrc] =
    useState<string>("/assets/avatar.png");
  const [itemData, setItemData] = useState<ItemDataType>(ProjectDefaultData);

  const [searchTerm, setSearchTerm] = useState<{
    role: string;
    tags: string;
  }>({
    role: "",
    tags: "",
  });

  const [filteredItems, setFilteredItems] = useState<
    TRoleUser[] | TTag[] | null
  >(null);
  const [isInputFocused, setIsInputFocused] = useState<{
    [key: string]: boolean;
  }>({ role: false, tags: false });
  const [visibleItemCount, setVisibleItemCount] = useState<number>(10);
  const [currentItemType, setCurrentItemType] =
    useState<PublicItemType>("role");

  useEffect(() => {
    const handler = setTimeout(() => {
      const itemsToFilter = currentItemType === "role" ? roles : tags;
      const searchValue =
        currentItemType === "role" ? searchTerm.role : searchTerm.tags;
      if (itemsToFilter && searchTerm) {
        const filtered = itemsToFilter.filter((item) =>
          item.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredItems(filtered);
      } else {
        setFilteredItems(itemsToFilter || []);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, currentItemType, roles, tags]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field:
      | keyof TProjects
      | TAddressFieldInputProfile
      | TProjectMemberFieldInput
  ) => {
    e.preventDefault();
    if (typeof e === null) return;
    const { value } = e.target;

    setSearchTerm((prev) => ({
      ...prev,
      [field as keyof TProjects]: value,
    }));

    const updateMemberField = (field: TProjectMemberFieldInput) => {
      setItemData((prevData) => ({
        ...prevData,
        member: (prevData?.member || []).map((m, i) =>
          i === field.index ? { ...m, [field.subfield]: value } : m
        ),
      }));
    };

    const updateAddressField = (addressField: keyof TAddress) => {
      setItemData((prevData) => ({
        ...prevData,
        address: {
          ...prevData?.address,
          [addressField]: addressField === "zip_code" ? Number(value) : value,
        },
      }));
    };

    if (typeof field === "object" && field.key === "member") {
      updateMemberField(field as TProjectMemberFieldInput);
      return;
    }
    switch (field) {
      case "address.street":
      case "address.city":
      case "address.state":
      case "address.zip_code":
        const addressField = field.split(".")[1];
        updateAddressField(addressField as keyof TAddress);
        break;

      default:
        setItemData((prevData) => ({
          ...prevData,
          [field as keyof TProjects]: value,
        }));
        break;
    }
  };

  const loadFileImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        const fileURL = URL.createObjectURL(file);
        setPreviewImgSrc(fileURL);

        const imageElement = new window.Image();
        imageElement.src = fileURL;
        imageElement.onload = () => {
          URL.revokeObjectURL(fileURL);
        };
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleDurationDate = (date: Date | null, field: string) => {
    setItemData((prevData: any) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const handleDurationDate = (
    date: Date | null,
    field: "start_date" | "end_date"
  ) => {
    setItemData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const handleSelectionApproval = (value: "yes" | "no") => {
    setItemData((prevData) => ({
      ...prevData,
      approval: value,
    }));
  };

  const handleAddMember = () => {
    setItemData((prevData) => ({
      ...prevData,
      member: [
        ...(prevData?.member || []),
        {
          profile_id: "",
          role_id: "",
          experience: "",
        },
      ],
    }));
  };

  const handleDeleteMember = (index: number) => {
    const updatedRmMembers = itemData?.member?.filter((_, i) => i !== index);
    setItemData((prevData) => ({
      ...prevData,
      member: updatedRmMembers,
    }));
  };

  return (
    <MainMenuContext.Provider
      value={{
        loadFileImg,
        handleDurationDate,
        previewImgSrc,
        setPreviewImgSrc,
        itemData,
        setItemData,
      }}
    >
      {children}
    </MainMenuContext.Provider>
  );
};

export const useMainMenu = () => {
  const context = useContext(MainMenuContext);
  if (!context) {
    throw new Error("useMainMenu must be used within a MainMenuProvider");
  }
  return context;
};
