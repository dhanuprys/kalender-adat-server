import axios from 'axios';
import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';
import getWuku from '../utils/getWuku';
import { useNavigate } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { mutate } from 'swr';
import CalendarHeader from './CalendarHeader';

function Calendar() {
    const [currentDate, setCurrentDate] = useState(DateTime.now());
    const navigate = useNavigate();
    const { data: calendarHoliday } = useSWRImmutable(
        `/api/holiday?month=${currentDate.month}&year=${currentDate.year}`,
        (url) => axios.get(url)
            .then((res) => normalizeHolidayDateList(res.data))
    );
    const { data: calendar, error: calendarError, isLoading } = useSWRImmutable(
        `/api/calendar?month=${currentDate.month}&year=${currentDate.year}`,
        (url) => axios.get(url)
            .then((res) => normalizeColorDateList(res.data))
    );

    const openPrevMonth = useCallback(() => {
        setCurrentDate(currentDate.minus({ month: 1 }));
    }, [currentDate]);

    const openNextMonth = useCallback(() => {
        setCurrentDate(currentDate.plus({ month: 1 }));
    }, [currentDate]);

    const doCalendarRefresh = useCallback(() => {
        mutate(`/api/holiday?month=${currentDate.month}&year=${currentDate.year}`);
        mutate(`/api/calendar?month=${currentDate.month}&year=${currentDate.year}`);
    }, [currentDate]);

    const normalizeHolidayDateList = useCallback((calendar) => {
        let output = {};

        for (const event of calendar) {
            output[event.date] || (output[event.date] = []);

            output[event.date].push(true);
        }

        return output;
    }, []);

    const normalizeColorDateList = useCallback((calendar) => {
        let output = {};

        for (const event of calendar) {
            output[event.date] || (output[event.date] = []);

            output[event.date].push(event.color);
        }

        return output;
    }, []);

    const generateBorderClassName = useCallback((colors) => {
        if (!colors) return '';

        const colorSet = [...new Set(colors)];

        switch(colorSet.length) {
            case 1:
                return `border-${colorSet[0]}-600`;
                break;
            case 2:
                return `border-t-${colorSet[0]}-600 border-r-${colorSet[0]}-600 border-l-${colorSet[1]}-600 border-b-${colorSet[1]}-600`;
                break;
            case 3:
                return `border-t-${colorSet[0]}-600 border-r-${colorSet[0]}-600 border-l-${colorSet[1]}-600 border-b-${colorSet[2]}-600`;
                break;
            case 4:
                return `border-t-${colorSet[0]}-600 border-r-${colorSet[1]}-600 border-l-${colorSet[2]}-600 border-b-${colorSet[3]}-600`;
            default:

        }
    });

    const cells = useMemo(() => {
        const DAY_NAMES = [
            { id: 'Min', bali: 'Redite' },
            { id: 'Sen', bali: 'Soma' },
            { id: 'Sel', bali: 'Anggara' },
            { id: 'Rab', bali: 'Buda' },
            { id: 'Kam', bali: 'Wraspati' },
            { id: 'Jum', bali: 'Sukra' },
            { id: 'Sab', bali: 'Saniscara' }
        ];

        /**
         * {
         *  type: blank | wuku | day | date
         * }
         */
        let output = [];
        let sortedDates = [];

        const monthStart = currentDate.startOf('month');
        let preDayStart = null;

        const monthStartWeekday = monthStart.weekday;
        let preDay = 0;
        let nextMonth = monthStart.plus({ month: 1 });
        let nextMonthLimit = 0;
        if (monthStartWeekday < 7) {
            preDay = monthStartWeekday;
            preDayStart = monthStart.minus({ day: preDay });
        }

        nextMonthLimit = 42 - (monthStart.daysInMonth + preDay);

        if (preDayStart) {
            for (let i = preDayStart.day; i <= preDayStart.endOf('month').day; i++) {
                sortedDates.push(preDayStart.set({ day: i }));
            }
        }

        for (let i = monthStart.day; i <= monthStart.endOf('month').day; i++) {
            sortedDates.push(monthStart.set({ day: i }));
        }

        for (let i = 1; i <= nextMonthLimit; i++) {
            sortedDates.push(nextMonth.set({ day: i }));
        }

        let columnRowIndex = 0;
        let dateRowIndex = 0;
        let wukuIndex = 0;
        let dayIndex = 0;

        for (let i = 0; i < 56; i++) {
            if (i === 0) {
                output.push({ type: 'blank' });
                continue;
            }

            if (i < 7) {
                const wukuStartDate = sortedDates[wukuIndex * 7];
                output.push({
                    type: 'wuku',
                    wuku: getWuku(new Date(wukuStartDate.year, wukuStartDate.month, wukuStartDate.day)).slice(0, 4)
                });
                wukuIndex++;
                continue;
            }

            if (i % 7 === 0) {
                output.push({ type: 'day', id: DAY_NAMES[dayIndex].id, bali: DAY_NAMES[dayIndex].bali });
                dayIndex++;
                continue;
            }

            if (dateRowIndex > 7) {
                continue;
            }

            if (columnRowIndex < 6) {
                const activeDate = sortedDates[dateRowIndex + (columnRowIndex * 7)];

                output.push({
                    type: 'date',
                    date: activeDate,
                    current: activeDate.year === currentDate.year && activeDate.month === currentDate.month,
                    today: DateTime.now().toFormat('yyyy-MM-dd') === activeDate.toFormat('yyyy-MM-dd')
                });

                columnRowIndex++;
                continue;
            }

            columnRowIndex = 0;
            dateRowIndex++;
            i--;
        }

        return output;
    }, [currentDate]);

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col">
            <CalendarHeader
                currentDate={currentDate}
                openPrevMonth={openPrevMonth}
                openNextMonth={openNextMonth} />

            <div className="flex-1">
                <div className="grid grid-cols-7 h-full">
                    {
                        cells.map((cell, idx) => {
                            if (cell.type === 'blank') {
                                return <div key={idx} onClick={() => isLoading && doCalendarRefresh()} className="bg-black flex justify-center items-center">
                                    {
                                        isLoading
                                            ? <svg className="w-[22px] h-[22px] text-white animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
                                            : <svg onClick={doCalendarRefresh} className="w-[22px] h-[22px] text-white transition-all hover:rotate-90 hover:text-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
                                    }
                                </div>
                            }

                            if (cell.type === 'wuku') {
                                return (
                                    <div key={idx} className="bg-black text-white flex justify-center items-center text-sm">
                                        {cell.wuku}
                                    </div>
                                );
                            }

                            if (cell.type === 'day') {
                                return (
                                    <div key={idx} className="bg-black text-white flex flex-col justify-center items-center border border-black">
                                        <div className="text-sm">{cell.id}</div>
                                        <div className="text-[10px]">{cell.bali}</div>
                                    </div>
                                );
                            }

                            const currentDateFormat = cell.date.toFormat('yyyy-MM-dd');
                            const todaysEvent = calendar ? calendar[currentDateFormat] : null;

                            console.log(todaysEvent, currentDateFormat);

                            return (
                                <div key={idx} onClick={() => todaysEvent && navigate(`/date/${currentDateFormat}`)} className={`relative flex justify-center items-center border-[0.5px] ${!cell.current ? 'bg-slate-900 text-slate-600 border-slate-800' : 'border-slate-300'} ${cell.today ? 'bg-green-100 border-2 border-slate-400' : 'hover:bg-slate-100'}`}>
                                    {todaysEvent && <div className="flex w-full h-full flex-col p-0.5 justify-between">
                                        <div className="flex justify-end">
                                            <div className="w-[10px] h-[10px] rounded-full text-xs">'{todaysEvent.length}</div>
                                        </div>
                                        <div></div>
                                    </div>}
                                    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center`}>
                                        <div className={`w-[35px] h-[35px] text-sm flex justify-center items-center rounded-full ${todaysEvent ? `border-4 ${generateBorderClassName(todaysEvent)}` : ''} ${cell.date.weekday === 7 || (calendarHoliday && calendarHoliday[currentDateFormat]) ? 'text-red-600 font-semibold' : ''}`}>{cell.date.toFormat('d')}</div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Calendar;
