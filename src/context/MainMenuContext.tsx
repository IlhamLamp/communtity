import { ProjectDefaultData } from "@/data/project.default";
import { TProjectMemberFieldInput, TProjects } from "@/types/project";
import React, { createContext, useContext, useMemo, useState } from "react";
import { TAddress, TAddressFieldInputProfile } from "@/types/profile";
import { useFilter } from "./FilterContext";

type ItemDataType = TProjects;

interface MainMenuContextProps {
  itemData: ItemDataType;
  setItemData: React.Dispatch<React.SetStateAction<ItemDataType>>;
  previewImgSrc: string;
  setPreviewImgSrc: React.Dispatch<React.SetStateAction<string>>;
  loadFileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDurationDate: (
    date: Date | null,
    field: "start_date" | "end_date"
  ) => void;
  handleSelectionApproval: (value: "yes" | "no") => void;
  handleAddMember: () => void;
  handleDeleteMember: (index: number) => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field:
      | keyof TProjects
      | TAddressFieldInputProfile
      | TProjectMemberFieldInput
  ) => void;
}

const MainMenuContext = createContext<MainMenuContextProps | undefined>(
  undefined
);

export const MainMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setSearchTerm } = useFilter();

  const [previewImgSrc, setPreviewImgSrc] =
    useState<string>("/assets/avatar.png");
  const [itemData, setItemData] = useState<ItemDataType>(ProjectDefaultData);

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

  const mainMenuMemo = useMemo(
    () => ({
      itemData,
      setItemData,
      previewImgSrc,
      setPreviewImgSrc,
      loadFileImg,
      handleDurationDate,
      handleSelectionApproval,
      handleAddMember,
      handleDeleteMember,
      handleInputChange,
    }),
    [
      itemData,
      setItemData,
      previewImgSrc,
      setPreviewImgSrc,
      loadFileImg,
      handleDurationDate,
      handleSelectionApproval,
      handleAddMember,
      handleDeleteMember,
      handleInputChange,
    ]
  );
  return (
    <MainMenuContext.Provider value={mainMenuMemo}>
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
