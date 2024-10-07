'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTriggerCuston,
} from '@/components/ui/select'
import Image from 'next/image'

import Calendar from '@/assets/calendar.png'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function CalendarSelect() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const year =
    searchParams.get('year') !== null
      ? (searchParams.get('year') as string)
      : '2024'

  console.log(year)

  function handleYearSearchParams(year: string) {
    const params = new URLSearchParams(searchParams)

    params.set('year', year)

    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <Select value={year} onValueChange={handleYearSearchParams}>
      <SelectTriggerCuston className="w-[90px] h-[82px] flex flex-col gap-2">
        <Image src={Calendar} alt="calendar" />
        <p className="text-xs text-sub-heading">{year}</p>
      </SelectTriggerCuston>
      <SelectContent className="font-sans">
        <SelectGroup>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
          <SelectItem value="2020">2020</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
