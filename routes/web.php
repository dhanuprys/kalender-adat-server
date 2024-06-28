<?php

use App\Models\EventCalendar;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('main');
});

Route::prefix('/api')->group(function () {
    Route::get('/calendar', function (Request $request) {
        $month = $request->query->get('month');
        $year = $request->query->get('year');

        if (!$month || !$year) {
            return response()->json([
                'message' => 'Month and year is required',
            ], 400);
        }

        $events = EventCalendar::join('event_categories as ec', 'ec.id', '=', 'event_calendars.category_id')
            ->whereRaw(
                'EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ?',
                [$month, $year]
            )
            ->select([
                'ec.color',
                'date'
            ])
            ->get();

        return response()->json($events);
    });

    Route::get('/calendar/{date}', function ($date) {
        $events = EventCalendar::join('event_categories as ec', 'ec.id', '=', 'event_calendars.category_id')
            ->select([
                'event_calendars.id',
                'event_calendars.image_url',
                'event_calendars.title',
                'event_calendars.description',
                'event_calendars.updated_at',
                'ec.color as category_color',
                'ec.name as category_name',
            ])
            ->where('date', $date)
            ->get();

        return response()->json($events);
    });
});
