import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePostsData() {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({ from, to });
      posts.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });

      return posts.map((post) => post.id);
    },

    initialPageParam: 0,
    getNextPageParam: (
      lastPage, // 가장 마지막에 불러온 페이지
      allPages, // 현재 불러온 데이터들의 모든 값 (페이지별 배열로 저장된다 2차원배열)
    ) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    }, // 새로운 페이지를 불러와야할 때 다음 페이지를 계산하기 위한 옵션

    staleTime: Infinity,
  });
}
