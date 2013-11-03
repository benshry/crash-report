<!DOCTYPE html>
<html>
    @include('templates.head')
    <body>
        <div id="wrapper">
            <div id="container">
                @include('templates.page-landing')
                @include('templates.page-add')
                @include('templates.page-browse')
            </div>
        </div>
        @include('templates.modal-crashinfo')
        @include('templates.modal-cardamage')
        @include('templates.modal-crashdiagram')
    <body>
</html>
