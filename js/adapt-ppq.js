define([
  'core/js/adapt',
  './ppqView',
  './ppqModel',
  'libraries/jquery-ui.min'
], function(Adapt, PpqView, PpqModel) {

  return Adapt.register("ppq-audio", {
    view: PpqView,
    model: PpqModel
  });

});
