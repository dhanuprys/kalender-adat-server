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
            $table->renameColumn('event_category_id', 'category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_calendars', function (Blueprint $table) {
            $table->renameColumn('category_id', 'event_category_id');
        });
    }
};
