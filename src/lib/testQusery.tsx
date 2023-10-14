import axios from "axios";

// export function getUsers() {
//     return axios
//         .get("https://jsonplaceholder.typicode.com/users")
//         .then(res => res.data)
// }

export const getUsersTest = async (page: string | number) => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`);
    const res = await data.json();
    // console.log(res);
    return res;
};



export const handleDelete = async (id: string) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    // const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    //     method: 'DELETE',
    // });
    // const res = await data.json();
    // console.log(res);
    // return res;
};




// export function getUsersPaginated(page:number) {
//     return axios
//         .get( `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`)
//         .then(res => {
//             const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
//             return {
//                 nextPage: hasNext ? page + 1 : undefined,
//                 previousPage: page > 1 ? page - 1 : undefined,
//                 users: res.data,
//             }
//         })
// }




export function createUser({ name, phone, email }) {
    return axios
        .post("https://jsonplaceholder.typicode.com/users", {
            name,
            phone,
            email,
            id: Date.now(),
        })
        .then(res => res.data)
}