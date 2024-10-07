'use client'
import Image from 'next/image'

import Bandeira from '@/assets/bandeira.svg'
import Chart from '@/assets/chart.svg'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SelectChart() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const type = searchParams.get('type')

  function handleSearchParams(chart: string) {
    const params = new URLSearchParams(searchParams)

    params.set('type', chart)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleSearchParams('uf')}
        variant={'outline'}
        className={`flex flex-col gap-4 h-[82px] ${type === 'uf' || type === null ? 'border-2 border-accent-color' : ''}`}
      >
        <Image src={Chart} alt="chart" />
        <p>Gastos por UF</p>
      </Button>
      <Button
        onClick={() => handleSearchParams('party')}
        variant={'outline'}
        className={`flex flex-col gap-4 h-[82px] ${type === 'party' && 'border-2 border-accent-color'}`}
      >
        <Image src={Bandeira} alt="bandeira" />
        <p>Gastos por Partido</p>
      </Button>
    </div>
  )
}
