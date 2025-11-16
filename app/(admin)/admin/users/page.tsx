import PrimaryButton from "@/components/PrimaryFilledButton";
import { FaUserPlus } from "react-icons/fa";
import UserTable from "./UserTable";

export default function Users() {
  const userdata = [
    {
      id: "USR001",
      name: "Aryan Budathoki",
      email: "aryan.budathoki@example.com",
      status: "Active",
      lastLogin: "2025-10-18T14:22:00Z",
      role: "Admin",
      created_at: "2024-12-01T09:30:00Z",
      updated_at: "2025-10-10T11:45:00Z",
    },
    {
      id: "USR002",
      name: "Sneha Sharma",
      email: "sneha.sharma@example.com",
      status: "InActive",
      lastLogin: "2025-08-05T08:15:00Z",
      role: "Customer_Support",
      created_at: "2025-01-20T12:00:00Z",
      updated_at: "2025-08-05T08:15:00Z",
    },
    {
      id: "USR003",
      name: "Ravi Thapa",
      email: "ravi.thapa@example.com",
      status: "Active",
      lastLogin: "2025-10-18T20:05:00Z",
      role: "Technician",
      created_at: "2025-03-14T10:40:00Z",
      updated_at: "2025-10-17T15:25:00Z",
    },
    {
      id: "USR004",
      name: "Hari Thapa",
      email: "hari.thapa@example.com",
      status: "Active",
      lastLogin: "2025-10-18T20:05:00Z",
      role: "Customer",
      created_at: "2025-03-14T10:40:00Z",
      updated_at: "2025-10-17T15:25:00Z",
    },
  ];
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="w-full flex justify-between">
        <p className="flex flex-col gap-1">
          <span className="text-2xl font-semibold">User Management</span>
          <span className="text-sm text-gray-500">Manage your users</span>
        </p>

        <PrimaryButton text="Add User" icon={<FaUserPlus size={17} />} />
      </div>

      <div>
        <UserTable userDatas={userdata} />
      </div>
    </div>
  );
}
