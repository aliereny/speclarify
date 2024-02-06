"use client";
import { ProjectForm } from "@/ui/templates/project-form/projectForm";
import {
  createProjectRequest,
  CreateProjectRequestPayload,
} from "@/redux/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";

export const ProjectCreatePage = () => {
  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;

  const onSave = (data: CreateProjectRequestPayload) => {
    dispatch(createProjectRequest({ ...data, orgPath }));
  };

  return <ProjectForm onSave={onSave} title={"Create Project"} />;
};
