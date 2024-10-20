'use client'

import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const useClock = () => {
    const [date, setDate] = useState(new Date());

    const tick = useCallback(() => {
        setDate(new Date());
    }, []);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, [tick]);

    return {
        hour: dayjs(date).hour(),
        minute: dayjs(date).minute(),
        seconds: dayjs(date).second()
    }
}