'use client'

import React, { useEffect, useState } from 'react'
import { LucideLightbulb } from 'lucide-react'
import clsx from 'clsx';
import { BlackoutRange } from '@/lib/interface/blackout.interface';
import { useClock } from '@/hooks/user-clock';
import Clock from './clock';

interface LightbulbProps {
    blackout: BlackoutRange[]
}
const Lightbulb: React.FC<LightbulbProps> = ({
    blackout
}) => {
    const [isNow, setIsNow] = useState<boolean>(false);
    const { hour, minute } = useClock();

    useEffect(() => {
        const now = Number(`${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`);

        const isNow = !!blackout.find((e) => {
            const from = Number(e.from.split(':').join(''));
            const to = Number(e.to.split(':').join(''));
            return from <= now && now <= to;
        });
        setIsNow(isNow);

    }, [blackout, hour, minute]);


    return (
        <>
            <LucideLightbulb className={clsx('w-[12rem] h-[12rem] md:w-[24rem] md:h-[24rem]', {
                'text-yellow-400': !isNow,
                'text-gray-500': isNow
            })} />
            <div className={clsx('px-4 py-2 rounded-lg',{
                'bg-yellow-400/50': !isNow,
                'bg-gray-500/50': isNow
            })}>
                <Clock />
            </div>
        </>
    )
}

export default Lightbulb