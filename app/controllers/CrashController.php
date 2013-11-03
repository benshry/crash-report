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

    public function pdf()
    {
        require('../lib/fpdf17/fpdf.php');

        $pdf = new FPDF();
        $pdf->AddPage();
        $pdf->SetFont('Arial', '', 7);
        $pdf->Cell(25, 10, 'Page ____ of ____');
        $pdf->Cell(15, 10, ' ____ Fatal');

        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(77, 10, 'Massachusetts Police Crash Investigation Report');

        $pdf->SetFont('Arial', '', 7);
        $pdf->Cell(20, 10, '__ Reportable');
        $pdf->Cell(24, 10, '__ Non-Reportable');
        $pdf->Cell(20, 10, '__ Change Report');

        $pdf->Output('report.pdf');

        return Redirect::to('/');
    }
}

?>
