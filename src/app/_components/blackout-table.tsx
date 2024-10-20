'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Blackout, BlackoutRange } from '@/lib/interface/blackout.interface'
import React, { useEffect, useState } from 'react'
import { useCalendar } from '../_context/calendar.provider'

interface BlackoutTableProps {
    data: Blackout
}
const BlackoutTable: React.FC<BlackoutTableProps> = ({
    data: blackout
}) => {

    const { date } = useCalendar();
    const [range, setRange] = useState<BlackoutRange[]>([]);

    useEffect(() => {
        const value = blackout[date];
        if (value) {
            setRange(value);
        } else {
            setRange([]);
        }
    }, [blackout, date]);


    return (
        range.length === 0
            ? <div>
                <span className='font-light'>No hay datos disponibles</span>
            </div>
            : <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-center'>Desde</TableHead>
                        <TableHead className='text-center'>Hasta</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        range.map(e => (
                            <TableRow key={Math.random()}>
                                <TableCell className='text-center'>{e.from}</TableCell>
                                <TableCell className='text-center'>{e.to}</TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </Table>
    )
}

export default BlackoutTable