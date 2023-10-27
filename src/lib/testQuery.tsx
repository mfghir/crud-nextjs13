import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// export function getUsers() {
//     return axios
//         .get("https://jsonplaceholder.typicode.com/users")
//         .then(res => res.data)
// }

export const getUsersTest = async (page: string | number) => {
    const data = await fetch(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist?_page=${page}&_limit=5`);
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




// export function createUser({ name, phone, email }) {
//     return axios
//         .post("https://jsonplaceholder.typicode.com/users", {
//             name,
//             phone,
//             email,
//             id: Date.now(),
//         })
//         .then(res => res.data)
// }







// export  function getUsersPaginated(page:any) {
//     return  axios
//       .get("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist", {
//         params: { _page: page, _sort: "name", _limit: 2 },
//       })
//       .then(res => {
//         const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
//         return {
//           nextPage: hasNext ? page + 1 : undefined,
//           previousPage: page > 1 ? page - 1 : undefined,
//           list: res.data,
//         }
//       })
//   }


  export const getUsersPaginated = async (page: string | number) => {
    const data = await fetch(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist?page=${page}&limit=10`);
    const res = await data.json();
    // console.log(res);
    return res;
  };
  

  
  interface UserData {
    id: string,
    name: string,
    email: string,
    phone: string
}

  interface UserQuery {
    page: number;
    pageSize: number;
  }
  
  export const useUsers = (query: UserQuery) =>
    useQuery<UserData[], Error>({
      queryKey: ["list", query],
      queryFn: () =>
        axios
          .get("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist", {
            params: {
              _start: (query.page - 1) * query.pageSize,
              _limit: query.pageSize,
            },
          })
          .then((res) => res.data),
      staleTime: 1 * 60 * 1000,
      keepPreviousData: true,
    });