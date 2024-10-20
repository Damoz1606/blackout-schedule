'use client'

import React from 'react'
import { useCalendar } from '../_context/calendar.provider'
import { Calendar } from '@/components/ui/calendar';
import dayConfig from '@/lib/day.config';

interface BlackoutCalendarProps {
    dates: Date[]
}
const BlackoutCalendar: React.FC<BlackoutCalendarProps> = ({
    dates
}) => {

    const { setDate } = useCalendar();
    const handleClick = (date: Date) => {
        setDate(dayConfig(date).format('YYYY-MM-DD'));
    }

    return (
        <Calendar
            mode="multiple"
            onDayClick={handleClick}
            selected={dates} />
    )
}

export default BlackoutCalendar