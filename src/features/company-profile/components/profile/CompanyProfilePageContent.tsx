"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import CompanyProfilePage from "./CompanyProfilePage";
import { useCompanyProfile } from "../../hooks/useCompanyProfile";
import EditBasicInfoModal from "../edit-profile/EditBasicInfoModal";
import EditDescriptionModal from "../edit-profile/EditDescriptionModal";
import EditDetailModal from "../edit-profile/EditDetailModal";
import EditContactModal from "../edit-profile/EditContactModal";
import EditCoverImageModal from "../edit-profile/EditCoverImageModal";
import EditLogoModal from "../edit-profile/EditLogoModal";
import ManageOfficeImagesModal from "../edit-profile/ManageOfficeImagesModal";

type CompanyProfilePageContentProps = {
  companyId?: string;
};

type ModalKey =
  | null
  | "basic-info"
  | "description"
  | "detail"
  | "contact"
  | "cover"
  | "logo"
  | "office-images";

export default function CompanyProfilePageContent({
  companyId,
}: CompanyProfilePageContentProps) {
  const { user } = useAuth();
  const viewerRole = user?.role;

  const { data, isLoading, error } = useCompanyProfile({
    viewerRole: viewerRole!,
    companyId,
  });

  const [activeModal, setActiveModal] = useState<ModalKey>(null);

  if (!viewerRole) return null;

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center text-[1rem] font-medium text-slate-500">
        Đang tải hồ sơ công ty...
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-8 py-12 text-center text-[1rem] font-medium text-red-600">
        Không thể tải hồ sơ công ty.
      </div>
    );
  }

  const company = data.data;
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <CompanyProfilePage
        company={company}
        viewerRole={viewerRole}
        isOwner={viewerRole === "COMPANY" && !companyId}
        onEditBasicInfo={() => setActiveModal("basic-info")}
        onEditDescription={() => setActiveModal("description")}
        onEditDetail={() => setActiveModal("detail")}
        onEditContact={() => setActiveModal("contact")}
        onManageOfficeImages={() => setActiveModal("office-images")}
        onChangeLogo={() => setActiveModal("logo")}
        onChangeCoverImage={() => setActiveModal("cover")}
        onFollow={() => console.log("follow company")}
        onRestrict={() => console.log("restrict company")}
      />

      {activeModal === "basic-info" && (
        <EditBasicInfoModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "description" && (
        <EditDescriptionModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "detail" && (
        <EditDetailModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "contact" && (
        <EditContactModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "cover" && (
        <EditCoverImageModal open onClose={closeModal} />
      )}

      {activeModal === "logo" && (
        <EditLogoModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "office-images" && (
        <ManageOfficeImagesModal open company={company} onClose={closeModal} />
      )}
    </>
  );
}
