import { useState } from "react";
import UserCard from "./components/UserCard";
import useUsers from "./hooks/usersHook";

function App() {
  const { users, loading, error } = useUsers();
  const [value, setValue] = useState("");
  const [filterValue, setFilterValue] = useState(["All"]);
  const [showFilters, setShowFilters] = useState(false);

  const search = value.trim().toLowerCase();
  let filteredUsers = users.filter((user) => {
    const matchesSearch = 
      !search || 
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search);

    const matchesRole =
      filterValue.includes("All") ||
      filterValue.includes(user.company.title);

    return matchesSearch && matchesRole;
  });

  const filterRoles = [
    "All",
    ...new Set(users.map((user) => user.company.title))
  ]

  const toggleRole = (role) => {
    if(role == "All") {
      setFilterValue(["All"]);
      return;
    }

    let updatedRole = filterValue.filter((r) => r != "All");

    if(filterValue.includes(role)) {
      updatedRole = filterValue.filter((r) => r != role);
    } else {
      updatedRole.push(role);
    }

    if(updatedRole.length == 0) {
      updatedRole = ["All"];
    }

    setFilterValue(updatedRole);
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-10 overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h1 className="text-center text-5xl font-semibold tracking-tight text-slate-900">
          Meet Our Team
        </h1>

        <div className="mt-6 w-full max-w-md flex space-x-3">
          <input
            className="w-full rounded-3xl bg-white px-6 py-3 text-slate-800 shadow-sm outline-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-300"
            type="text"
            placeholder="Search by name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div onClick={() => setShowFilters(true)} className="cursor-pointer h-12 px-6 flex items-center justify-center border-2 bg-white border-slate-200 rounded-3xl">
            Filter
          </div>
        </div>

        { showFilters 
          ? <div className="h-screen w-screen fixed inset-0 bg-[#000000ae] flex items-center justify-center">
              <div className="flex w-2/3 h-fit bg-white flex-wrap gap-4 my-10 p-10 rounded-4xl relative">
                {filterRoles.map((role, index) => {
                  return (<div key={index} onClick={() => {toggleRole(role)}} className={`${filterValue.includes(role) ?"bg-black text-white" : "bg-gray-100 text-[#232323]"} cursor-pointer w-fit py-4 text-md text-center px-6 rounded-3xl`}>{role}</div>)
                })}

                <button onClick={() => setShowFilters(false)} className="cursor-pointer h-12 w-12 rounded-full font-bold text-white bg-black absolute -top-6 -right-6 flex items-center justify-center">X</button>
              </div>
            </div> 
          : ""}

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
            Failed to load team members. Please try again.
          </p>
        )}

        <div className="mt-10 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {loading ? (
            <div className="col-span-full text-sm text-slate-500">
              Loading team members...
            </div>
          ) : (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;