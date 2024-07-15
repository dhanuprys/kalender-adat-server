<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PurnamaTilemResource\Pages;
use App\Filament\Resources\PurnamaTilemResource\RelationManagers;
use App\Models\PurnamaTilem;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PurnamaTilemResource extends Resource
{
    protected static ?string $model = PurnamaTilem::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('type')
                    ->options([
                        'P' => 'Purnama',
                        'T' => 'Tilem'
                    ])
                    ->required(),
                Forms\Components\DatePicker::make('date')
                    ->unique()
                    ->required()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->label('Purnama/Tilem')
                    ->getStateUsing(function ($record) {
                        return $record->type === 'P'? 'Purnama' : 'Tilem';
                    }),
                Tables\Columns\TextColumn::make('date')
                    ->label('Tanggal')
                    ->sortable()
                    ->searchable()
                    ->getStateUsing(function ($record) {
                        return Carbon::createFromFormat('Y-m-d', $record->date)->format('d F Y');
                    })
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPurnamaTilems::route('/'),
            'create' => Pages\CreatePurnamaTilem::route('/create'),
            'edit' => Pages\EditPurnamaTilem::route('/{record}/edit'),
        ];
    }
}
