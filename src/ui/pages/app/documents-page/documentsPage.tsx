"use client";
import { Button, Table } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { fetchDocumentsRequest } from "@/redux/slices/documentSlice";

export const DocumentsPage = () => {
  const { documents } = useAppSelector((state) => state.documents);

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchDocumentsRequest({
        orgPath,
        projectPath,
      }),
    );
  }, []);

  return (
    <div>
      <h1>DocumentsPage</h1>
      <Button
        type={"primary"}
        href={`/organizations/${orgPath}/projects/${projectPath}/documents/new`}
      >
        Create Document
      </Button>
      <Table />
    </div>
  );
};
