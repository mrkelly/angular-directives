(function() {

  angular.module('app', [])
    .directive('svgBox', svgBox);

  function svgBox() {
    return {
      priority: 0,
      restrict: 'E',
      templateNamespace: 'svg',
      template: `
        <svg width="175" height="175">
          <rect width="150" height="150"/>
        </svg>
      `
    };
  }

}());
