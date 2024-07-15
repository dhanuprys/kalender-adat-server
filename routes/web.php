<?php

use App\Models\EventCalendar;
use App\Models\Holiday;
use App\Models\PurnamaTilem;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::get('/', function () {
    return view('main');
});

Route::get('/date/{all}', function () {
    return view('main');
})->where('all', '.*');

Route::prefix('/api')->group(function () {
    Route::prefix('/v1')->group(function () {
        Route::get('/purtim', function (Request $request) {
            $month = $request->query->get('month');
            $year = $request->query->get('year');

            if (!$month || !$year) {
                return response()->json([
                    'message' => 'Month and year is required',
                ], 400);
            }

            $days = PurnamaTilem::whereRaw(
                'EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ?',
                [$month, $year]
            )->get();

            return response()->json($days);
        });

        Route::get('/calendar', function (Request $request) {
            $month = $request->query->get('month');
            $year = $request->query->get('year');

            if (!$month || !$year) {
                return response()->json([
                    'message' => 'Month and year is required',
                ], 400);
            }

            $group = [];
            $output = [];

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

            foreach ($events as $event) {
                if (!isset($group[$event->date])) {
                    $group[$event->date] = [];
                }

                // Duplicate detection
                if (in_array($event->color, $group[$event->date])) {
                    continue;
                }

                $group[$event->date][] = $event->color;
            }

            foreach ($group as $date => $colors) {
                $output[] = [
                    'date' => $date,
                    'colors' => $colors,
                    'event_count' => count($colors)
                ];
            }

            return response()->json($output);
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
                ->orderBy('ec.color')
                ->get();

            return response()->json($events);
        });

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
    });
});
