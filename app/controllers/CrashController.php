<?php

class CrashController extends BaseController {

    // XXX validate user in session
    public function create()
    {
        $crash = new Crash();
        $crash->save();

        Session::put('crash_id', $crash->id);

        $this->jsonSuccess();
    }

    public function get()
    {
        if (Session::has('crash_id') === false) {
            return Redirect::to('/');
        }

        $this->jsonSuccess((array)Crash::find(Session::get('crash_id'))->toArray());
    }

    public function update()
    {
        if (Session::has('crash_id') === false) {
            return Redirect::to('/');
        }

        $data = Input::all();
        unset($data['id']);

        Crash::where('id', '=', Session::get('crash_id'))->update($data);

        $this->jsonSuccess();
    }
}

?>
