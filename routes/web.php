<?php

use App\Models\EventCalendar;
use App\Models\Holiday;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::get('/', function () {
    return view('main');
});

Route::get('/date/{all}', function () {
    return view('main');
})->where('all', '.*');

Route::prefix('/api')->group(function () {
    Route::get('/holiday', function (Request $request) {
        $year = $request->query->get('year');
        $month = $request->query->get('month');

        if (!$year || !$month) {
            return response()->json([]);
        }

        $holiday = Holiday::whereRaw(
            'EXTRACT(YEAR FROM date) = ? AND EXTRACT(MONTH FROM date) = ?',
            [ $year, $month ]
        )->select([
            'date'
        ])->get();

        return response()->json($holiday);
    });

    Route::get('/holiday/{date}', function ($date) {
        $holiday = Holiday::where('date', $date)
            ->select([
                'date',
                'name'
            ])->first();

        if (!$holiday) {
            return response()->json(null, 404);
        }

        return response()->json($holiday);
    });

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
