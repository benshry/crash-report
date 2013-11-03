<div class="page" id="add">
    @include('templates.header')
    <div class="row">
        <div class="option" class="btn" data-toggle="modal" href="#modal-crashdiagram">
            <h1>Crash Diagram</h1>
            <div class="option-body">
                <img src="/img/icon-map.jpg">
            </div>
        </div>
        <div class="option" class="btn" data-toggle="modal" href="#modal-cardamage">
            <h1>Car Damage</h1>
            <div class="option-body">
                <img src="/img/icon-damage-horiz.jpg">
            </div>
        </div>
        <div class="option" class="btn" data-toggle="modal" href="#modal-crashinfo">
            <h1>Crash Information</h1>
            <div class="option-body">
                <img src="/img/icon-crash.jpg">
            </div>
        </div>
    </div>
    <div class="row" id="plus">
        <div class="option" id="option-add-vehicle" data-vehicle-num="1">
            <h1>Vehicle 1</h1>
            <div class="remove-option"><div class="remove-option-abs">X</div></div>
            <div class="option-body">
                <img src="/img/icon-car.png">
            </div>
        </div>
        <img id="plus-img" src="/img/icon-plus.png">
    </div>
    <div class="row">
        <div class="option" class="btn" data-toggle="modal" href="#modal-officer">
            <h1>Officer/Department</h1>
            <div class="option-body">
                <img src="/img/icon-police.jpg">
            </div>
        </div>
    </div>
</div>
