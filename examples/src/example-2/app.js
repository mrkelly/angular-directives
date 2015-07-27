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
      `,
      link: (scope, element, attributes) => {
        let isOn = false;
        let rect = element.find('rect');

        function setFill() {
          rect.attr('fill', isOn ? '#00BCD4' : '#000000');
        }

        function toggleFill() {
          isOn = !isOn;
          setFill();
        }

        element.on('click', toggleFill);
      }
    };
  }

}());
