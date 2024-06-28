@extends('layouts.app')

@section('title', 'Tidak Ditemukan')

@section('header')
    @include('layouts.ui.basichead', [
        'title' => 'Halaman Tidak Ditemukan',
        'backHref' => '/',
    ])
@endsection

@section('content')
    <script>window.location.href = '/'</script>
@endsection
