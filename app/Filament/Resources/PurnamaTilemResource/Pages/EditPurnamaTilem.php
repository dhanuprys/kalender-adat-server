<?php

namespace App\Filament\Resources\PurnamaTilemResource\Pages;

use App\Filament\Resources\PurnamaTilemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPurnamaTilem extends EditRecord
{
    protected static string $resource = PurnamaTilemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
