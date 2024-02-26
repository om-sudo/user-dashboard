import { User } from "@/users/columns";

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('http://localhost:3000/users');
    const userData = await response.json();
    return userData;
};

const addUser = async (user: User): Promise<User[]> => {
    const userToAdd = {...user,"isDeleted":false};
    const response = await fetch('http://localhost:3000/users',{
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(userToAdd)
    });
    return response.json();
}

const deleteUser = async (user: User): Promise<User[]> => {
    const userId=user?.value?.id;
    const updatedUserValue = {...user,"isDeleted":true};
    const response = await fetch(`http://localhost:3000/users/${userId}`,{
        method: "PUT",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify(updatedUserValue)
    });
    return response.json();
}

const updateUser = async (user: User): Promise<User[]> => {
    const userId=user?.id;
    const updatedUserValue = {...user};
    const response = await fetch(`http://localhost:3000/users/${userId}`,{
        method: "PUT",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify(updatedUserValue)
    });
    return response.json();
}

export {fetchUsers, addUser, deleteUser, updateUser} ;