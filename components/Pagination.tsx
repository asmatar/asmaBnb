"use client";
import { useRouter, useSearchParams } from "next/navigation";
const Pagination = ({ totalPages }: { totalPages: number }) => {
  console.log(totalPages);
  const router = useRouter();
  //const [page, setPage] = useState(0);
  const searchParams = useSearchParams();

  const handlePageChange = (index: number) => {
    //setPage(index);
    const from = index * 11;
    const to = from + 11;

    const params = new URLSearchParams(searchParams.toString());
    params.set("from", from.toString());
    params.set("to", to.toString());
    router.push(`/?${params.toString()}`);
    router.refresh();
    //router.push(`/?from=${from}&to=${to}`);
    //console.log("page", page);
    console.log("from", from);
    console.log("to", to);
  };
  return (
    <ul className="flex justify-center items-center gap-4 my-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary/80 transition-all duration-300"
          onClick={() => handlePageChange(index)}
          aria-label={`Go to page ${index + 1}`}
        >
          {index}
        </button>
      ))}
    </ul>
  );
};

export default Pagination;
