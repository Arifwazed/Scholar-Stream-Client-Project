import React from "react";
import { PlusCircle, ListChecks, Clock, CheckCircle, User } from "lucide-react";

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewCard
          icon={<PlusCircle className="size-6 text-orange-500" />}
          title="Add Loan"
          desc="Create new loan packages with custom EMI plans and interest rates."
        />

        <OverviewCard
          icon={<ListChecks className="size-6 text-blue-500" />}
          title="Manage Loans"
          desc="Update existing loans, change interest rates, or remove packages."
        />

        <OverviewCard
          icon={<Clock className="size-6 text-yellow-500" />}
          title="Pending Apps"
          desc="Review borrower applications. Approve or reject based on criteria."
        />

        <OverviewCard
          icon={<CheckCircle className="size-6 text-green-500" />}
          title="Approved Apps"
          desc="View history of all sanctioned loans and disbursement details."
        />

        <OverviewCard
          icon={<User className="size-6 text-purple-500" />}
          title="My Profile"
          desc="Update your account information and security settings."
        />
      </div>
    </div>
  );
};

const OverviewCard = ({ icon, title, desc }) => {
  return (
    <div className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex size-12 items-center justify-center rounded-lg bg-slate-100">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
