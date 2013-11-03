<!-- Modal -->
<div class="modal fade" id="modal-crashinfo" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="modal-label-crashinfo">Crash Information</h4>
      </div>
      <div class="modal-body">
        <form>
          <textarea id="crash-description" name="crash-description" type="text" placeholder="Crash Description"></textarea>
          <textarea id="crash-damage" name="crash-damage" type="text" placeholder="Damage To Other Property"></textarea>
          <input name="crash-location" type="text" placeholder="Location">
          <input id="crash-injured" name="crash-injured" type="text" placeholder="Injured">
          <input id="crash-killed" name="crash-killed" type="text" placeholder="Killed">
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
