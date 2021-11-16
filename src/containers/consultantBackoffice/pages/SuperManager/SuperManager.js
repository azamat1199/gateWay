import React from "react";
import SuperSidebar from "./SuperSidebar";
// import TableManager from "./TableManager";
import TableManager from "../../../consultantBackoffice/pages/SuperManager/TableManager";

export default function SuperManager() {
  return (
    <div>
      <SuperSidebar />
      <TableManager />
    </div>
  );
}
 