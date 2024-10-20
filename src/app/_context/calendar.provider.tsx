"use client"

import dayjs from "dayjs";
import React, { createContext, useContext, useState } from "react";

interface CalendarContextProps {
    date: string;
    setDate: (value: string) => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export function useCalendar(): CalendarContextProps {
    const context = useContext(CalendarContext);
    if (!context) throw new Error('useCalendar can only be used inside CalendarProvider');
    return context;
}

const CalendarProvider: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {

        const [value, setValue] = useState(dayjs().format('YYYY-MM-DD'));

        return (
            <CalendarContext.Provider value={{
                date: value,
                setDate: setValue
            }}>
                {children}
            </CalendarContext.Provider>
        )
    }

export default CalendarProvider