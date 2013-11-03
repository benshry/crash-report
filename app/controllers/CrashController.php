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

    public function getAll()
    {
        $crashes = Crash::all();

        $this->jsonSuccess(array('crashes' => $crashes->toArray()));
    }

    public function set()
    {
        Session::put('crash_id', Input::get('crash_id'));

        $this->jsonSuccess();
    }

    public function get()
    {
        if (Session::has('crash_id') === false) {
            return Redirect::to('/');
        }

        $crash = Crash::find(Session::get('crash_id'));
        if ($crash === null) {
            return Redirect::to('/');
        }

        $this->jsonSuccess($crash->toArray());
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
