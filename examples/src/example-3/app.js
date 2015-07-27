(function() {

  angular.module('app', [])
    .controller('AppController', AppController)
    .directive('svgBox', svgBox);

  function AppController() {
    this.boxWasClicked = function(i, j, status) {
      console.log(`Box (${i}, ${j}) turned ${status ? 'on' : 'off'}!`);
    };
  }

  function svgBox() {
    return {
      priority: 0,
      restrict: 'E',
      templateNamespace: 'svg',
      template: `
        <svg width="175" height="175">
          <rect width="150" height="150"/>
        </svg>
      `,
      scope: {
        isOn: '=',
        onClick: '&'
      },
      link: (scope, element, attributes) => {
        let rect = element.find('rect');

        function setFill() {
          rect.attr('fill', scope.isOn ? '#00BCD4' : '#000000');
        }

        function toggleFill() {
          scope.isOn = !scope.isOn;
          setFill();
          scope.onClick({status: scope.isOn});
        }

        element.on('click', () => scope.$apply(toggleFill));

        setFill();
      }
    };
  }

}());
