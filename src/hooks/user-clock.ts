'use client'

import dayConfig from "@/lib/day.config";
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
        hour: dayConfig(date).hour(),
        minute: dayConfig(date).minute(),
        seconds: dayConfig(date).second()
    }
}