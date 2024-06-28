<?php

namespace App\Filament\Resources\EventCalendarResource\Pages;

use App\Filament\Resources\EventCalendarResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEventCalendar extends EditRecord
{
    protected static string $resource = EventCalendarResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
