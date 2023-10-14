import { getUsersTest } from "@/lib/testQusery";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  const users = (page = 1) => getUsersTest(page);

  const { isLoading, data } = useQuery(["users", page], () =>
    users(+page)
  );

  const nextPage = async () => {
    const nextPageData = await users(+page + 1);
    if (nextPageData.length > 0) {
      router.push(`/?page=${+page + 1}&limit=5`);
    }
  };

  const prevPage = () => {
    if (+page > 1) {
      router.push(`/?page=${+page - 1}&_limit=5`);
    }
  };
  return { nextPage, prevPage, data, isLoading, page };
};

export default usePagination;