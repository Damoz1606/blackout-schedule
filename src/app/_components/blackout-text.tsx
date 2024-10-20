'use client'

import { useCalendar } from '../_context/calendar.provider'
import dayjs from 'dayjs';

const BlackoutText = () => {

    const { date } = useCalendar();

    return `Fecha de corte: ${dayjs(date).format('YYYY-MM-DD')}`
}

export default BlackoutText