import FilterableTable from "@/app/components/filterable-table"
import Header from "../components/Header"

export default function Home() {
  return (<>
  <Header/>
    <main className="min-h-screen p-12">
      <h1 className="text-4xl font-bold mb-8 text-green-600">Welcome Admin!</h1>
      <FilterableTable />
    </main>
  </>
  )
}

