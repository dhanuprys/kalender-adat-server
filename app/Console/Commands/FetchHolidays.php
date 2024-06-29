<?php

namespace App\Console\Commands;

use App\Models\Holiday;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class FetchHolidays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-holidays';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $year = Carbon::now()->format('Y');
        $response = Http::get("https://api-harilibur.vercel.app/api?year=$year");

        if (!$response->ok()) {
            return response()->json([]);
        }

        DB::transaction(function () use ($response, $year) {
            Holiday::whereRaw('EXTRACT(YEAR FROM date) = ?', [$year])->delete();

            foreach ($response->json() as $holiday) {
                Holiday::create([
                    'date' => Carbon::createFromFormat('Y-m-d', $holiday['holiday_date'])->format('Y-m-d'),
                    'name' => $holiday['holiday_name'],
                    'is_national_holiday' => $holiday['is_national_holiday']
                ]);
            }
        });
    }
}
