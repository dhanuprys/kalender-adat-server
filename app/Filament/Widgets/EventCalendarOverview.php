<?php

namespace App\Filament\Widgets;

use App\Models\EventCalendar;
use App\Models\EventCategory;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class EventCalendarOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Kategori', EventCategory::count()),
            Stat::make('Total Acara', EventCalendar::count())
        ];
    }
}
