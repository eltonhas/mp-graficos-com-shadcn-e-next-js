import { CalendarSelect } from '@/_components/calendar-select'
import { ChartByParty } from '@/_components/chart-by-party'
import { ChartByUF } from '@/_components/chart-by-uf'

import { Header } from '@/_components/header'
import { SelectChart } from '@/_components/select-chart'
import { api } from '@/lib/axios'

interface HomeProps {
  searchParams: {
    type: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const [uf, party] = await Promise.all([
    api.get('/summary/by-uf'),
    api.get('/summary/by-party'),
  ])

  console.log(searchParams.type)

  return (
    <div className="font-sans w-full max-w-6xl m-auto">
      <div className="pt-20 pb-24 flex gap-10">
        <Header />
        <CalendarSelect />
        <div className="w-0.5 rounded bg-black opacity-15" />
        <SelectChart />
      </div>
      {searchParams.type === 'uf' || searchParams.type === undefined ? (
        <ChartByUF dataChart={uf.data} />
      ) : (
        <ChartByParty dataChart={party.data} />
      )}
    </div>
  )
}
