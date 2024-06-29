import axios from 'axios';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';

function EventCard({ title, imageUrl, description, categoryName, categoryColor, updatedAt }) {
    const humanizeUpdatedAt = DateTime.fromISO(updatedAt).setLocale('id').toFormat('dd MMMM yyyy');

    return (
        <div className="bg-slate-50 rounded shadow">
            {imageUrl && <div className="h-[150px] bg-red-200 rounded-t">
                <img className="w-full h-full object-cover rounded-t" src={`/storage/${imageUrl}`} />
            </div>}
            <div className="p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p>{description}</p>
                <div className="flex items-center gap-2 mt-3">
                    <div className={`w-[10px] h-[10px] bg-${categoryColor}-500 rounded-full`}></div>
                    <div>{categoryName}</div>
                </div>
                <div className="flex justify-end mt-4">
                    <p className="text-slate-400 text-sm">Diperbarui pada {humanizeUpdatedAt}</p>
                </div>
            </div>
        </div>
    );
}

function DateDetail() {
    const navigate = useNavigate();
    const { date } = useParams();
    const { data: events, error: eventError, isLoading } = useSWRImmutable(
        `/api/calendar/${date}`,
        (url) => axios.get(url).then(response => response.data),
        {
            shouldRetryOnError: false
        }
    );
    const { data: holiday } = useSWRImmutable(
        `/api/holiday/${date}`,
        (url) => axios.get(url).then(response => response.data),
        {
            shouldRetryOnError: false
        }
    );

    const dayString = useMemo(() => {
        const currentDate = DateTime.fromFormat(date, 'yyyy-MM-dd');

        if (!currentDate.isValid) {
            return null;
        }

        return currentDate.setLocale('id').toFormat('cccc, dd MMMM yyyy');
    });

    if (!dayString) {
        navigate(-1);

        return 'invalid';
    }

    return (
        <div>
            {/* HEADER */}
            <div className="sticky top-0 shadow bg-red-500 p-4 pt-6 grid grid-cols-8 items-center gap-4 text-white">
                <div onClick={() => navigate(-1)}>
                    <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                </div>
                <div className="col-span-6 flex flex-col items-center justify-center">
                    <div className="inline px-6 font-bold text-lg">{dayString}</div>
                    {holiday && <span className="text-slate-100 text-center text-sm">Libur {holiday.name}</span>}
                </div>
                <div></div>
            </div>

            {/* CONTENT */}
            {
                events
                    ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                        {
                            events.map((dayEvent) => {
                                return (
                                    <EventCard
                                        key={dayEvent.id}
                                        imageUrl={dayEvent.image_url}
                                        title={dayEvent.title}
                                        description={dayEvent.description}
                                        categoryName={dayEvent.category_name}
                                        categoryColor={dayEvent.category_color}
                                        updatedAt={dayEvent.updated_at}
                                    />
                                );
                            })
                        }
                    </div>
                    : isLoading
                        ? <div className="flex justify-center items-center h-[70vh]">Loading...</div>
                        : eventError
                            ? <div className="flex justify-center items-center h-[70vh]">Gagal memuat data</div>
                            : null
            }
        </div>
    );
}

export default DateDetail;
