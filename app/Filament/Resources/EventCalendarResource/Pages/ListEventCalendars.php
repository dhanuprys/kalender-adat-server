<?php

namespace App\Filament\Resources\EventCalendarResource\Pages;

use App\Filament\Resources\EventCalendarResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEventCalendars extends ListRecords
{
    protected static string $resource = EventCalendarResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
