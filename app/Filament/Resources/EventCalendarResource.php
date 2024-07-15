<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventCalendarResource\Pages;
use App\Filament\Resources\EventCalendarResource\RelationManagers;
use App\Models\EventCalendar;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventCalendarResource extends Resource
{
    protected static ?string $model = EventCalendar::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Daftar Acara';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Nama Acara')
                    ->maxLength(255)
                    ->required(),
                Forms\Components\Select::make('category_id')
                    ->label('Kategori')
                    ->relationship('category', 'name')
                    ->required()
                    ->createOptionForm([
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
                    ]),
                Forms\Components\DatePicker::make('date')
                    ->label('Tanggal')
                    ->required(),
                Forms\Components\Textarea::make('description')
                    ->label('Deskripsi'),
                Forms\Components\FileUpload::make('image_url')
                    ->label('Gambar')
                    ->directory('events'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Kategori'),
                Tables\Columns\TextColumn::make('description')
                    ->label('Deskripsi')
                    ->limit(10),
                Tables\Columns\TextColumn::make('date')
                    ->label('Tanggal')
                    ->getStateUsing(function ($record) {
                        return Carbon::createFromFormat('Y-m-d', $record->date)->format('d F Y');
                    })
                    ->sortable()
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category.name')
                    ->relationship('category', 'name')
                    ->label('Filter kategori')
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
            'index' => Pages\ListEventCalendars::route('/'),
            'create' => Pages\CreateEventCalendar::route('/create'),
            'edit' => Pages\EditEventCalendar::route('/{record}/edit'),
        ];
    }
}
