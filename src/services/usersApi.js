import axios from "axios";

const URL = "https://dummyjson.com/users";

const fetchUsersData = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch(e) {
        throw new Error("Unable to fetch the data");
    }
}

export default fetchUsersData;