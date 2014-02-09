var Controller = function() {
  var controller = function(layer, container, btnAdd, btnEdit, btnDelete,
      btnCancel) {

    var points = [];
    
    var initializeAddState = function() {
      console.log('initializing add state');
      btnAdd.attr('disabled', 'disabled');
      btnEdit.attr('disabled', 'disabled');
      btnDelete.attr('disabled', 'disabled');
      btnCancel.removeAttr('disabled');
    };

    var uninitializeAddState = function() {
      console.log('uninitializing add state');
    };

    var initializeEditState = function() {
      console.log('initializing edit state');
      btnAdd.attr('disabled', 'disabled');
      btnEdit.attr('disabled', 'disabled');
      btnDelete.attr('disabled', 'disabled');
      btnCancel.removeAttr('disabled');
    };

    var uninitializeEditState = function() {
      console.log('uninitializing edit state');
    };

    var initializeDeleteState = function() {
      console.log('initializing delete state');
      btnAdd.attr('disabled', 'disabled');
      btnEdit.attr('disabled', 'disabled');
      btnDelete.attr('disabled', 'disabled');
      btnCancel.removeAttr('disabled');
    };

    var uninitializeDeleteState = function() {
      console.log('uninitializing delete state');
    };

    var initializeIdleState = function() {
      console.log('initializing idle state');
      btnAdd.removeAttr('disabled');
      btnEdit.removeAttr('disabled');
      btnDelete.removeAttr('disabled');
      btnCancel.attr('disabled', 'disabled');
    };

    var uninitializeIdleState = function() {
      console.log('uninitializing idle state');
    };

    var stateMachine = StateMachine.create({
      initial : 'Idle',
      events : [ {
        name : 'addArea',
        from : 'Idle',
        to : 'AddingNewArea'
      }, {
        name : 'idle',
        from : '*',
        to : 'Idle'
      }, {
        name : 'editArea',
        from : 'Idle',
        to : 'EditingArea'
      }, {
        name : 'deleteArea',
        from : 'Idle',
        to : 'DeletingArea'
      } ],
      callbacks : {
        onenterAddingNewArea : function(event, from, to) {
          initializeAddState();
        },
        onleaveAddingNewArea : function(event, from, to) {
          uninitializeAddState();
        },
        onenterEditingArea : function(event, from, to) {
          initializeEditState();
        },
        onleaveEditingArea : function(event, from, to) {
          uninitializeEditState();
        },
        onenterDeletingArea : function(event, from, to) {
          initializeDeleteState();
        },
        onleaveDeletingArea : function(event, from, to) {
          uninitializeDeleteState();
        },
        onenterIdle : function(event, from, to) {
          initializeIdleState();
        },
        onleaveIdle : function(event, from, to) {
          uninitializeIdleState();
        }
      }
    });

    var initContainer = function(instance, container) {
      container.on("click", clickHandler);
      btnAdd.on("click", function(event) {
        stateMachine.addArea();
      });
      btnEdit.on("click", function(event) {
        stateMachine.editArea();
      });
      btnDelete.on("click", function(event) {
        stateMachine.deleteArea();
      });
      btnCancel.on("click", function(event) {
        stateMachine.idle();
      });
    };

    var onPointAdded = function(circle) {
      points.push(circle);
      console.log('new point added at ' + circle.x() + ':' + circle.y() + ' total: ' + points.length);
    };

    var clickHandler = function(event) {
      if (event.ctrlKey) {
        layer.add(createCircle(event.pageX, event.pageY, onPointAdded));
        layer.draw();
      };
    };

    initContainer(this, container);
  };

  return controller;
}();