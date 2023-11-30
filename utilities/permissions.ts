import { NextRequest } from "next/server";
import { getLoggedInEmployee } from "./helpers";

export const isHR = (request: NextRequest): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const loggedInEmployee = await getLoggedInEmployee(request);

      if (loggedInEmployee.department === "HR") resolve(true);

      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};
