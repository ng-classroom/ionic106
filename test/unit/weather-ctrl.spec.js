describe('Controlador Weather', function () {
  var scope, httpBackend;
  // var window = {
  //   clientHeight: 0,
  //   innerWidth: 500,
  //   innerHeight: 100
  // };

  var chicago = {
    city: 'Chicago, IL, USA',
    lat: 41.8781136,
    lng: -87.6297982
  };

  var weather = {};

  beforeEach(module('App'));

  beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();

    spyOn(document, 'getElementsByTagName').and.callFake(function() {
      return [{clientHeight: 50}]
    });

    httpBackend = $httpBackend;
    $controller('WeatherController', {
      $scope: scope,
      $stateParams: chicago
    });
    httpBackend.when('GET', '/api/forecast/' + chicago.lat + ',' + chicago.lng + '?units=us').respond(weather);
    httpBackend.when('GET', /.*\.html$/).respond('');
  }));

  it('Deberia calcular los valores de Ancho y Alto.', function () {
    expect(scope.getWidth()).toEqual(window.innerWidth + 'px');
    expect(scope.getHeight()).toEqual((window.innerHeight - 50) + 'px')
    expect(scope.getTotalHeight()).toEqual(3 * (window.innerHeight - 50) + 'px')
  })
})
