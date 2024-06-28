import preset from './vendor/filament/support/tailwind.config.preset'

export default {
    safelist: [
        {
            pattern: /border-(red|green|blue|yellow|slate|purple|indigo|pink)-(500)/,
        },
        {
            pattern: /bg-(red|green|blue|yellow|slate|purple|indigo|pink)-(500)/,
        },
    ],
    presets: [preset],
    content: [
        './app/Filament/**/*.php',
        './resources/views/**/*.blade.php',
        './vendor/filament/**/*.blade.php',
        './resources/react/**/*.jsx'
    ],
}
