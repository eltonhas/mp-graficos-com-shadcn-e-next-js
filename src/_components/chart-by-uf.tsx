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

interface UFProps {
  uf: string
  total_expenses: string
}

export interface DataUFProps {
  year: string
  data: UFProps[]
}

interface ChartByUFProps {
  dataChart: DataUFProps[]
}

const chartConfig = {
  desktop: {
    label: 'Gastos',
    color: '#7467C9',
  },
} satisfies ChartConfig

export function ChartByUF({ dataChart }: ChartByUFProps) {
  const searchParams = useSearchParams()
  const year =
    searchParams.get('year') !== null
      ? (searchParams.get('year') as string)
      : '2024'
  const dataUsing = dataChart.filter(data => data.year === year)

  const dataUFUsing = dataUsing[0]

  const dataUFUsingFormated = dataUFUsing.data.map(item => ({
    ...item,
    total_expenses: Number(item.total_expenses),
  }))

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded p-2">
          <p className="label">
            <span className="text-violet-500 font-bold">{label}: </span>
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
        <CardTitle>Gasto por UF</CardTitle>
        <CardDescription>Dados de {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dataUFUsingFormated}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="uf"
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
              tickMargin={10}
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
              fill="#7467C9"
              radius={4}
            >
              <LabelList
                dataKey="uf"
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
