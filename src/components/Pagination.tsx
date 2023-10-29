import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";


const getUsersPaginated = async (page: string | number) => {
  const data = await fetch(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist?page=${page}&limit=10`);
  const res = await data.json();
  // console.log(res);
  return res;
};




const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  const users = (page = 1) => getUsersPaginated(page);

  const { isLoading, data } = useQuery(["list", page], () =>
    users(+page)
  );

  const nextPage = async () => {
    const nextPageData = await users(+page + 1);
    if (nextPageData.length > 0) {
      router.push(`/?page=${+page + 1}&limit=10`);
    }
  };

  const prevPage = () => {
    if (+page > 1) {
      router.push(`/?page=${+page - 1}&_limit=10`);
    }
  };
  return { nextPage, prevPage, data, isLoading, page };
};

export default usePagination;