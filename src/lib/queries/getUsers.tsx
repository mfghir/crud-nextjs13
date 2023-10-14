export type User = {
    id: number;
    // userId: ()=> Date.now();
    name: string;
    phone: string;
    email: string;
  };

export const getUsers = async () => {
    return (await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())) as User[];
  };