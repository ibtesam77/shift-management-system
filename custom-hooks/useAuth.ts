"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { EmployeeBasicInfo } from "@/types/employee";
import { SuccessResponse } from "@/types/general";

interface AuthData {
  isLoading: boolean;
  isAuthenticated: boolean;
  loggedInEmployee?: EmployeeBasicInfo;
}

const useAuth = (): AuthData => {
  const [isLoading, setIsLoading] = useState<AuthData["isLoading"]>(true);
  const [isAuthenticated, setIsAuthenticated] =
    useState<AuthData["isAuthenticated"]>(false);
  const [loggedInEmployee, setLoggedInEmployee] =
    useState<AuthData["loggedInEmployee"]>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/me")
      .then(({ data: response }) => {
        setLoggedInEmployee(
          (response as SuccessResponse<AuthData["loggedInEmployee"]>).data
        );
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
        setLoggedInEmployee(undefined);
        setIsAuthenticated(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    isAuthenticated,
    loggedInEmployee,
  };
};

export default useAuth;
