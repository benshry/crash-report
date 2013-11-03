<?php

class VehicleController extends BaseController {

    public function create()
    {
        if (Session::has('crash_id') === false) {
            $this->jsonFailure();
        }

        $vehicle = new Vehicle();
        $vehicle->crash_id = Session::get('crash_id');
        $vehicle->save();
        $this->jsonSuccess(array('id' => $vehicle->id));
    }

    public function delete()
    {
        Vehicle::destroy(Input::get('id'));
    }

    public function getAll()
    {
        if (Session::has('crash_id') === false) {
            $this->jsonFailure();
        }

        $vehicles = Vehicle::where('crash_id', '=', Session::get('crash_id'))->get();

        $this->jsonSuccess(array('vehicles' => $vehicles->toArray()));
    }

    public function set()
    {
        Session::put('vehicle_id', Input::get('vehicle_id'));

        $this->jsonSuccess();
    }

    public function get()
    {
        if (Session::has('vehicle_id') === false) {
            return Redirect::to('/');
        }

        $vehicle = Vehicle::find(Session::get('vehicle_id'));
        if ($vehicle === null) {
            $this->jsonFailure();
        }

        $this->jsonSuccess($vehicle->toArray());
    }

    public function update()
    {
        if (Session::has('vehicle_id') === false) {
            $this->jsonFailure();
        }

        $data = Input::all();
        $fields = array();

        if (isset($data['vin'])) {
            $vin = VIN::where('vin', '=', $data['vin'])->first();
            if ($vin === null) {
                $this->jsonFailure();
            }
            $data['model'] = $vin->model;
            $data['make'] = $vin->make;
            $data['year'] = $vin->year;
            $fields['model'] = $vin->model;
            $fields['make'] = $vin->make;
            $fields['year'] = $vin->year;
        }
        unset($data['id']);
        unset($data['crash_id']);

        Vehicle::where('id', '=', Session::get('vehicle_id'))->update($data);

        $this->jsonSuccess(array('fields' => $fields));
    }
}

?>
