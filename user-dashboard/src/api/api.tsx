import { User } from "@/users/columns";

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('http://localhost:3000/users?_sort=-id');
    const userData = await response.json();
    return userData;
};

const addUser = async (user: User): Promise<User[]> => {
    const response = await fetch('http://localhost:3000/users',{
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
    return response.json();
}

export {fetchUsers, addUser} ;