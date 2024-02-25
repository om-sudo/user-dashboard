import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { fetchUsers } from "@/api/api";

const Page = () => {

    const { data, isLoading, isError, error} = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers
    })

    return(
        <section className="py-24">
            <div className="container">
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                {isLoading && <p>Loading...</p>}
                {isError && <p>{error?.message}</p>}
                {!isLoading && !isError && <DataTable columns={columns} data={data}/>}
            </div>
        </section>
    );
}

export default Page;