'use client'

import dayConfig from '@/lib/day.config';
import { useCalendar } from '../_context/calendar.provider'

const BlackoutText = () => {

    const { date } = useCalendar();

    return `Fecha de corte: ${dayConfig(date).format('YYYY-MM-DD')}`
}

export default BlackoutText