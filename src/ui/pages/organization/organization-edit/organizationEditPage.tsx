"use client";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  CreateOrganizationRequestPayload,
  fetchOrganizationRequest,
  updateOrganizationRequest,
} from "@/redux/slices/organizationSlice";
import { OrganizationForm } from "@/ui/templates/organization-form/organizationForm";
import { Skeleton } from "antd";

export const OrganizationEditPage = () => {
  const { loading, currentOrganization } = useAppSelector(
    (state) => state.organizations,
  );

  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;

  useEffect(() => {
    dispatch(fetchOrganizationRequest(orgPath));
  }, []);

  const onSave = (data: CreateOrganizationRequestPayload) => {
    dispatch(
      updateOrganizationRequest({
        ...data,
        path: orgPath,
      }),
    );
  };

  return !loading && currentOrganization ? (
    <OrganizationForm
      selectedOrganization={currentOrganization}
      onSave={onSave}
      title={"Edit Organization"}
    />
  ) : (
    <Skeleton active />
  );
};
