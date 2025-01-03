"use client";
import { ProjectDefaultData } from "@/data/project.default";
import { TProjectMemberFieldInput, TProjects } from "@/types/project";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  handleUpdateItem: (field: keyof ItemDataType | string, value: any) => void;
}

const MainMenuContext = createContext<MainMenuContextProps | undefined>(
  undefined
);

export const MainMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setSearchTerm, deleteSearchTerm } = useFilter();

  const [previewImgSrc, setPreviewImgSrc] =
    useState<string>("/assets/avatar.png");
  const [itemData, setItemData] = useState<ItemDataType>(ProjectDefaultData);

  useEffect(() => {
    if (itemData.logo) {
      setPreviewImgSrc(itemData.logo);
    }
  }, [itemData.logo]);

  const handleUpdateItem = useCallback(
    (field: keyof ItemDataType | string, value: any) => {
      setItemData((prevData) => {
        if (typeof field === "string" && field.includes("-")) {
          // field-[index].subfield
          const [parentField, index, subField] = field.split(/[-.]/);
          if (Array.isArray(prevData[parentField as keyof ItemDataType])) {
            return {
              ...prevData,
              [parentField]: (
                prevData[parentField as keyof ItemDataType] as any[]
              ).map((item, i) =>
                i === Number(index) ? { ...item, [subField]: value } : item
              ),
            };
          }
        }
        return {
          ...prevData,
          [field as keyof ItemDataType]: value,
        };
      });
    },
    []
  );

  const handleInputChange = useCallback(
    (
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
        const inputKey = `${field.key}-${field.index}.${field.subfield}`;
        setSearchTerm((prev) => ({
          ...prev,
          [inputKey]: value,
        }));
        setItemData((prevData) => ({
          ...prevData,
          member: (prevData?.member || []).map((member, i) =>
            i === field.index ? { ...member, [field.subfield]: value } : member
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
          {
            const addressField = field.split(".")[1];
            updateAddressField(addressField as keyof TAddress);
          }
          break;

        default:
          setItemData((prevData) => ({
            ...prevData,
            [field as keyof TProjects]: value,
          }));
          break;
      }
    },
    [setSearchTerm, setItemData]
  );

  const loadFileImg = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    []
  );

  const handleDurationDate = useCallback(
    (date: Date | null, field: "start_date" | "end_date") => {
      setItemData((prevData) => ({
        ...prevData,
        [field]: date,
      }));
    },
    []
  );

  const handleAddMember = useCallback(() => {
    setItemData((prevData) => ({
      ...prevData,
      member: [
        ...(prevData?.member || []),
        {
          profile_id: "",
          role: {},
          experience: "",
        },
      ],
    }));
  }, []);

  const handleDeleteMember = useCallback(
    (index: number) => {
      setItemData((prevData) => {
        const updatedMembers = [...(prevData.member || [])];
        updatedMembers.splice(index, 1);
        return { ...prevData, member: updatedMembers };
      });

      // Update searchTerm keys
      deleteSearchTerm(`member-${index}.role`);
    },
    [deleteSearchTerm]
  );

  const mainMenuMemo = useMemo(
    () => ({
      itemData,
      setItemData,
      previewImgSrc,
      setPreviewImgSrc,
      loadFileImg,
      handleDurationDate,
      handleAddMember,
      handleDeleteMember,
      handleInputChange,
      handleUpdateItem,
    }),
    [
      itemData,
      setItemData,
      previewImgSrc,
      setPreviewImgSrc,
      loadFileImg,
      handleDurationDate,
      handleAddMember,
      handleDeleteMember,
      handleInputChange,
      handleUpdateItem,
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
