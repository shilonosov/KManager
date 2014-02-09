var createCircle = function(x, y, onFinishedCallback) {
  var circle = new Kinetic.Circle({
    x : x,
    y : y,
    radius : 3,
    fill : 'red',
    stroke : 'black',
    strokeWidth : 1,
    draggable : false
  });
  
  circle.onclick = function(event) {
    console.log('I am clicked! ' + circle.x() + ':' + circle.y());
  };

  circle.managerOnMouseMove = function(event) {
    circle.x(event.pageX);
    circle.y(event.pageY);
    circle.getParent().draw();
  };
  
  circle.managerUnsubscribe = function() {
    container.off("mousemove", circle.managerOnMouseMove);
    container.off("click", circle.managerUnsubscribe);
    circle.on("click", circle.onclick);
    onFinishedCallback(circle);
  };

  container.on("mousemove", circle.managerOnMouseMove);
  container.on("click", circle.managerUnsubscribe);

  return circle;
};