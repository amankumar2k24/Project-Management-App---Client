import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {AlertCircle,AlertOctagon,AlertTriangle,Briefcase,ChevronDown,ChevronUp,Home,Layers3,LockIcon,LucideIcon,Search,Settings,ShieldAlert,User,Users,X,} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  console.log("projects=>", projects);

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 400) {
      dispatch(setIsSidebarCollapsed(true)); 
    }else{
      dispatch(setIsSidebarCollapsed(false));
    }
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [dispatch]);


  return (
    <motion.div
    initial={{ width: isSidebarCollapsed ? 0 : 225 }}
    animate={{ width: isSidebarCollapsed ? 0 : 225 }}
    exit={{ width: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className={`fixed flex flex-col h-full justify-between shadow-xl z-40 dark:bg-black overflow-y-auto bg-white ${
      isSidebarCollapsed ? "hidden sm:block" : "block"
    }`}
  >
      <div className="flex h-[100%] transition-all duration-300 ease-in-out w-full flex-col justify-start overflow-x-hidden">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
          EnvisionPro  
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
          //  src="/logo.png" 
          src={`https://pm-s3-buckets.s3.ap-south-1.amazonaws.com/logo.png`}
           alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              AMAN TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS  */}

        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/home" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>

        {/* PROJECTS LINKS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* PROJECTS LIST */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
        {/* PRIORITIES LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  const sidebarCollapsed =()=>{
    if(window.innerWidth <= 400){
      dispatch(setIsSidebarCollapsed(true))
    }
  }

  return (
    <Link href={href} className="w-full" onClick={()=>sidebarCollapsed()}>
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
