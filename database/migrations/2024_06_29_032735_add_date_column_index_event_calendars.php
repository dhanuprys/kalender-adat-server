<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('event_calendars', function (Blueprint $table) {
            $table->index('date', 'idx_event_calendars_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_calendars', function (Blueprint $table) {
            $table->dropIndex('idx_event_calendars_date');
        });
    }
};
