import { useState } from 'react';

function CalendarHeader({ currentDate, openPrevMonth, openNextMonth }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="bg-red-500 p-4 pt-6 flex items-center gap-4 text-white">
                <div onClick={() => setSidebarOpen(true)} className="px-2">
                    <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </div>
                <div className="flex-1 flex justify-between items-center">
                    <div onClick={openPrevMonth}>
                        <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                    </div>
                    <div className="border-2 px-6 py-2 font-bold">{currentDate.setLocale('id').toFormat('MMM yyyy')}</div>
                    <div onClick={openNextMonth}>
                        <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                    </div>
                </div>
            </div>

            <div className={`fixed top-0 left-0 z-[50] w-screen h-screen transition-all flex ${isSidebarOpen ? '' : '-translate-x-[100vw]'}`}>
                <div className="w-[80vw] md:w-[20vw] h-screen bg-white shadow-2xl flex flex-col p-2 max-h-screen overflow-auto">
                    <div className="flex justify-center p-8 mb-4">
                        <img className="w-[100px] h-[100px] object-contain" src="/logo.jpg" />
                    </div>

                    <div className="flex items-center gap-2 p-4 rounded hover:cursor-pointer hover:bg-slate-100">
                        <div>
                            <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                        </div>
                        <div>Info Aplikasi</div>
                    </div>
                </div>
                <div className="flex-1 bg-black opacity-15" onClick={() => setSidebarOpen(false)}></div>
            </div>
        </>
    );
}

export default CalendarHeader;
