define([
  'core/js/models/questionModel'
], function(QuestionModel) {

  var PpqModel = QuestionModel.extend({

    init: function() {
      QuestionModel.prototype.init.call(this);
      this.set('_pinsPlaced', 0);
      this.checkCanSubmit();
    },


    setScore: function() {
      var questionWeight = this.get('_questionWeight');
      var answeredCorrectly = this.get('_isCorrect');
      var score = answeredCorrectly ? questionWeight : 0;
      this.set('_score', score);
    },

    restoreUserAnswers: function() {
      if (!this.get('_isSubmitted')) return;

      this.setQuestionAsSubmitted();
      this.markQuestion();
      this.setScore();
      this.setupFeedback();
    },

    canSubmit: function() {
      var canSubmit = this.get('_pinsPlaced') == this.get('_maxSelection');
      return canSubmit;
    },

    isPartlyCorrect: function() {
      return this.get('_isAtLeastOneCorrectSelection');
    },

    resetUserAnswer: function() {
      this.set({ _userAnswer: [] });
    },

    /**
    * Used by tracking extensions to return an object containing the component's specific interactions.
    */
    // TODO - create interactions value
    getInteractionObject: function() {
      var interactions = {
        correctResponsesPattern: null,
        source: null,
        target: null
      };
      var items = this.get('_items');




      return interactions;
    },

    /**
    * Used by adapt-contrib-spoor to get the user's answers in the format required by the cmi.interactions.n.student_response data field
    * @return {string} the user's answers as a string in the format "1.1#2.3#3.2" assuming user selected option 1 in drop-down 1,
    * option 3 in drop-down 2 and option 2 in drop-down 3. The '#' character will be changed to either ',' or '[,]' by adapt-contrib-spoor,
    * depending on which SCORM version is being used.
    */
    getResponse: function() {
      var responses = [];

      this.get('_userAnswer').forEach(function(userAnswer, index) {
        responses.push((index + 1) + "." + (userAnswer + 1));// convert from 0-based to 1-based counting
      });

      return responses.join('#');
    },

    /**
    * Used by adapt-contrib-spoor to get the type of this question in the format required by the cmi.interactions.n.type data field
    * @return {string}
    */
    getResponseType: function() {
      return "matching";
    }
  });

  return PpqModel;
});
