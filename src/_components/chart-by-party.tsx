'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useSearchParams } from 'next/navigation'

export const description = 'Um gráfico de gastos dos senadores por estado.'

interface PartyProps {
  party: string
  senator_ids: string[]
  total_expenses: string
  total_per_senator: number
}

export interface DataPartyProps {
  year: string
  data: PartyProps[]
}

interface ChartByPartyProps {
  dataChart: DataPartyProps[]
}

const chartConfig = {
  desktop: {
    label: 'Gastos',
    color: '#FF9043',
  },
} satisfies ChartConfig

export function ChartByParty({ dataChart }: ChartByPartyProps) {
  const searchParams = useSearchParams()
  const year =
    searchParams.get('year') !== null
      ? (searchParams.get('year') as string)
      : '2024'

  const dataUsing = dataChart.filter(data => data.year === year)

  const dataPartyUsing = dataUsing[0]

  const dataPartyUsingFormated = dataPartyUsing.data.map(item => ({
    ...item,
    total_expenses: Number(item.total_expenses),
  }))

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded p-2">
          <p className="label">
            <span className="text-orange-500 font-bold">{label}: </span>
            <span>
              {new Intl.NumberFormat('pt-br').format(payload[0].value)}
            </span>
          </p>
        </div>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gasto por Partido</CardTitle>
        <CardDescription>Dados de {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dataPartyUsingFormated}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="party"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
              hide
            />
            <XAxis
              dataKey="total_expenses"
              type="number"
              tickFormatter={value =>
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(value)
              }
            />
            <ChartTooltip cursor={false} content={CustomTooltip} />
            <Bar
              dataKey="total_expenses"
              layout="vertical"
              fill="#FF9043"
              radius={4}
            >
              <LabelList
                dataKey="party"
                position="insideLeft"
                offset={8}
                className="fill-white font-bold"
                fontSize={12}
              />
              <LabelList
                dataKey="total_expenses"
                position="right"
                offset={8}
                className="fill-foreground font-bold"
                fontSize={12}
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                formatter={(value: any) =>
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
