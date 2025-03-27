"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { SearchResult, useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResult | null>(null);
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      setSearchTerm(value);
      if (value === "") {
        setFilteredResults(null);
      }
    },
    500,
  );

  useEffect(() => {
    if (!searchTerm) {
      setFilteredResults(null);
    } else {
      setFilteredResults(searchResults ?? null);
    }
  }, [searchResults, searchTerm]);

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      {searchTerm === "" && (
      <div className="flex flex-col text-gray-500">
        <p className="text-lg font-medium mt-3">Start typing to find what you&apos;re looking for...</p>
      </div>
    )}
      <div className="p-5">
        {isLoading && (
            <div
            className="flex items-center justify-center w-full"
            style={{ height: "100vh" }}
          >
            <SyncLoader size={18} color="#8A33FD" />
          </div>
        )}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && filteredResults && (
          <div>
            {filteredResults.tasks && filteredResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {filteredResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {filteredResults.projects && filteredResults.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {filteredResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {filteredResults.users && filteredResults.users?.length > 0 && (
              <h2>Users</h2>
            )}
            {filteredResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
