<?php

class BaseController extends Controller {

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if ( ! is_null($this->layout))
        {
            $this->layout = View::make($this->layout);
        }
    }

    public function jsonSuccess($array = array())
    {
        $array['success'] = true;

        echo json_encode($array);

        exit;
    }

    public function jsonFailure($errors = array())
    {

        echo json_encode(array(
            'success' => false,
            'error' => $errors
        ));

        exit;
    }

}
