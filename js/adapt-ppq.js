define([
  'core/js/adapt',
  './ppqView',
  './ppqModel'
], function(Adapt, PpqView, PpqModel) {

  return Adapt.register("ppq-audio", {
    view: PpqView,
    model: PpqModel
  });

});
