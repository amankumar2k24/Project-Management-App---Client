import { Project } from "@/state/api";
import React from "react";
import { format } from "date-fns";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {

  return (
    <div className="rounded border p-4 shadow">
      <h3 className="font-bold text-lg">{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project?.startDate ? format(new Date(project.startDate), "dd/MM/yyyy hh:mm a") : "N/A"}</p>
      <p>End Date: {project?.endDate ? format(new Date(project.endDate), "dd/MM/yyyy hh:mm a") : "N/A"}</p>

    </div>
  );
};

export default ProjectCard;
