"use client"
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DatePickerWithRange({ className }: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 3, 20),
    to: new Date(2023, 4, 12),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start border-gray-700 bg-gray-800 text-left text-gray-200 hover:bg-gray-700 hover:text-white text-xs sm:text-sm",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  <span className="hidden sm:inline">
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </span>
                  <span className="sm:hidden">
                    {format(date.from, "MM/dd")} - {format(date.to, "MM/dd")}
                  </span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">{format(date.from, "LLL dd, y")}</span>
                  <span className="sm:hidden">{format(date.from, "MM/dd/yy")}</span>
                </>
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-gray-700 bg-gray-800 p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            className="bg-gray-800 text-gray-200 text-xs sm:text-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
