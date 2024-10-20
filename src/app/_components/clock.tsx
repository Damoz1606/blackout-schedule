'use client'

import { useClock } from '@/hooks/user-clock'
import React from 'react'

const Clock = () => {

    const { hour, minute, seconds } = useClock();

    return (
        <div className='text-white' suppressHydrationWarning>
            {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
    )
}

export default Clock