"use client"

import { RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
    current: number
    target: number
}

export function ProgressRadial({ current, target }: Props) {
    const percentage = Math.min((current / target) * 100, 100)
    const chartData = [{ name: "progress", value: percentage, fill: "var(--chart-1)" }]

    return (
        <Card className="flex flex-col items-center justify-center p-4">
            <CardContent className="flex flex-col items-center justify-center p-0 relative">
                {/* Valeur au centre */}
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                    {Math.round(percentage)}%
                </div>

                <RadialBarChart
                    width={150}
                    height={150}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    barSize={15}
                    data={chartData}
                    startAngle={90}    // début haut
                    endAngle={-270}    // cercle complet sens anti-horaire
                >
                    <RadialBar
                        dataKey="value"
                        cornerRadius={50}
                        background={{ fill: "#eee" }}  // montre la totalité
                    />
                </RadialBarChart>

            </CardContent>
        </Card>
    )
}
