import { useState } from "react";
import { Loader, FormField, Card } from "~/components";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "~/services/get-all-post";
import { useDebouncing } from "~/hooks";

export function Home() {
  const [query, setQuery] = useState("");
  const debouncingQuery = useDebouncing<string>(query);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });

  const filteredPostBySearchText =
    debouncingQuery.length > 0 &&
    data?.posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(debouncingQuery.toLowerCase()) ||
        post.name.toLowerCase().includes(debouncingQuery.toLowerCase())
    );

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-sm max-w-lg">
          Browser through a collection of imaginative and visually stunning
          images generated by <strong>DALL-E AI</strong>
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelText="Search posts"
          type="text"
          name="search"
          placeholder="Ex: my favorite post..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {query && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for&nbsp;
                <span className="text-[#222328]">{query}</span>
              </h2>
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {filteredPostBySearchText ? (
                filteredPostBySearchText.length > 0 ? (
                  filteredPostBySearchText.map((post) => (
                    <Card key={post.id} post={post} />
                  ))
                ) : (
                  <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
                    No results found
                  </h2>
                )
              ) : (
                data?.posts.map((post) => <Card key={post.id} post={post} />)
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
