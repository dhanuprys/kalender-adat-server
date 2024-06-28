<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventCategoryResource\Pages;
use App\Filament\Resources\EventCategoryResource\RelationManagers;
use App\Models\EventCategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventCategoryResource extends Resource
{
    protected static ?string $model = EventCategory::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                                        ->label('Nama Kategori')
                                        ->maxLength(255)
                                        ->required(),
                Forms\Components\Select::make('color')
                                        ->label('Warna Kategori')
                                        ->options([
                                            'blue' => 'Biru (blue)',
                                            'red' => 'Merah (red)',
                                            'green' => 'Hijau (green)',
                                            'yellow' => 'Kuning (yellow)',
                                            'purple' => 'Ungu (purple)',
                                            'indigo' => 'Indigo (indigo)',
                                            'pink' => 'Pink (pink)',
                                            'slate' => 'Hitam (slate)'
                                        ])
                                        ->default('slate')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                                        ->label('Nama')
                                        ->searchable(),
                Tables\Columns\TextColumn::make('color')
                                        ->label('Warna')
                                        ->searchable()
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
            'index' => Pages\ListEventCategories::route('/'),
            'create' => Pages\CreateEventCategory::route('/create'),
            'edit' => Pages\EditEventCategory::route('/{record}/edit'),
        ];
    }
}
