
import ContactsPage from '@/components/ContactsPage';
import HomePage from '@/components/HomePage';
import { Test } from '@/components/Test';
import NewTest from '@/components/NewTest';
import Pagination from '@/components/user/Pagination';
import UserListPage from '@/components/user/UserListPage';

import {useQuery} from '@tanstack/react-query'

export default function Home() {

// 
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () =>
  //     fetch(`https://jsonplaceholder.typicode.com/users`).then(
  //       (res) => res.json(),
  //     ),
  // })


  return (
    <main className="min-h-screen  p-8 lg:20 bg-gray-200">
      {/* <HomePage /> */}
      {/* <ContactsPage  /> */}
<Test />

{/* <NewTest /> */}
      {/* <UserListPage/>
      <Pagination /> */}
    </main>
  )
}
