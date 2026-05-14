import { useEffect, useState } from "react";
import fetchUsersData from "../services/usersApi";

function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchUsersData();
                setUsers(data.users);
            } catch(e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return {users, loading, error};
}

export default useUsers;