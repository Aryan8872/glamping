"use client";
import { User } from "@/types/UserTypes";
import { BiSearch } from "react-icons/bi";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

export default function UserTable({userDatas}:{userDatas:User[]}) {
    const animatedComponents = makeAnimated();
    const roleOption : {label:string,value:string}[] = [{label:"Admin",value:"Admin"},{label:"Customer",value:"Customer"}]
    const statusOption : {label:string,value:string}[] = [{label:"All",value:"All"},{label:"Active",value:"Active"},{label:"InActive",value:"InActive"}]

    return (
        <div className="w-full mt-10">
            <div className="w-full flex justify-between  px-5 py-5 bg-white rounded-t-2xl ">
                <div className="flex flex-[0.6] py-3 px-3  items-center rounded-lg bg-[#F3F4F6] gap-2">
                    <BiSearch size={18} className="" color={"black"}/>
                    <input className="w-full h-full focus:outline-none rounded-lg relative" placeholder="Search "/>
                </div>

                <div className="flex gap-3  font-semibold">
                    <div className="flex gap-2 items-center bg-[#F3F4F6] px-3 rounded-lg">
                        <span>Role:</span>
                        <Select components={animatedComponents} className="!focus:outline-none !border-0" defaultValue={roleOption[0]} options={roleOption} />                    
                    </div>
                        <div className="flex gap-2 items-center bg-[#F3F4F6] px-3 rounded-lg">
                        <span>Status:</span>
                        <Select components={animatedComponents} className="!focus:outline-none !border-0 px-2" defaultValue={statusOption[0]} options={statusOption} />                    

                    </div>
                </div>

            </div>
            <table className="w-full table-auto text-left mt-3">
                <thead className="text-gray-700 bg-[#F9FAFB] ">
                    <tr>
                        <th className="px-4 py-2 font-semibold">User</th>
                        <th className="px-4 py-2 font-semibold">Status</th>
                        <th className="px-4 py-2 font-semibold">Role</th>
                        <th className="px-4 py-2 font-semibold">Last Login</th>
                        <th className="px-4 py-2 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userDatas?.map((user,index)=>(
                        <tr key={user.email ?? index} className="border-b text-[15px] border-black/10 bg-white">
                            <td className="px-4 py-3">
                                <div className="flex flex-col gap-1">
                                    {user.name}
                                    <span className="text-sm text-gray-500">{user.email}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3  text-gray-500 ">{user.status}</td>
                            <td className="px-4 py-3 text-gray-500 ">{user.role}</td>
                            <td className="px-4 text-gray-500 py-3 ">{user.lastLogin}</td>
                            <td className="px-4 py-3 ">
                                <div className="flex items-center gap-2">
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="bg-white font-semibold rounded-b-2xl flex justify-between text-sm py-6 px-3 items-center">
                <span>Showing 1 to 10 of 10 entries</span>
                <div className="flex gap-2">
                    <button>Previous</button>
                    <button>Next</button>
                </div>

            </div>
        </div>
    )
}