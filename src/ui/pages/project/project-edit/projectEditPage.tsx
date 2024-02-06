"use client";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  CreateProjectRequestPayload,
  fetchProjectRequest,
  updateProjectRequest,
} from "@/redux/slices/projectSlice";
import { ProjectForm } from "@/ui/templates/project-form/projectForm";
import { Skeleton } from "antd";

export const ProjectEditPage = () => {
  const { loading, currentProject } = useAppSelector((state) => state.projects);

  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  useEffect(() => {
    dispatch(
      fetchProjectRequest({
        projectPath,
        orgPath,
      }),
    );
  }, []);

  const onSave = (data: CreateProjectRequestPayload) => {
    dispatch(
      updateProjectRequest({
        ...data,
        projectPath,
        orgPath,
      }),
    );
  };

  return !loading && currentProject ? (
    <ProjectForm
      selectedProject={currentProject}
      onSave={onSave}
      title={"Edit Project"}
    />
  ) : (
    <Skeleton active />
  );
};
