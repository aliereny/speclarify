import { OrganizationForm } from "@/ui/templates/organization-form/organizationForm";
import {
  createOrganizationRequest,
  CreateOrganizationRequestPayload,
} from "@/redux/slices/organizationSlice";
import { useAppDispatch } from "@/redux/appStore";

export const OrganizationCreatePage = () => {
  const dispatch = useAppDispatch();

  const onSave = (data: CreateOrganizationRequestPayload) => {
    dispatch(createOrganizationRequest(data));
  };

  return <OrganizationForm onSave={onSave} title={"Create Organization"} />;
};
