import React from "react";
import SidebarAccountant from "./SidebarAccountant";
import AccountantGraph from "./AccountantGraph";

export default function AccountantAnalytics() {
  return (
    <div>
      <SidebarAccountant>
        <AccountantGraph />
      </SidebarAccountant>
    </div>
  );
}
