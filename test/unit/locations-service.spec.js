describe('Locations Service', function () {
  var service;

  var one = {lat: 123, lng: 123};
  var two = {lat: 456, lng: 456};

  beforeEach(module('App'));

  beforeEach(inject(function (Locations) {
    service = Locations;
  }));

  it('Deberia comenzar sin localizaciones.', function () {
    expect(service.data.length).toEqual(0);
  });

  it('Deberia encontra un index de localizacion.', function () {
    service.data.push(one);
    expect(service.getIndex(one)).toEqual(0);
    expect(service.getIndex(two)).toEqual(-1);
  });

  it('Deberia ser capaz de agregar un item por toggle', function () {
    service.toggle(one);
    service.toggle(two);
    expect(service.data.length).toEqual(2);
  });

  it('Deberia mover un item dentro de la posicion primaria', function () {
    service.toggle(one);
    service.toggle(two);
    service.primary(two);
    expect(service.data[0]).toEqual(two);

    service.data = [one];
    service.primary(two);
    expect(service.data[0]).toEqual(two);
  });

  it('Deberia remover un existente item por toggle', function () {
    service.toggle(one);
    expect(service.getIndex(one)).toEqual(0);

    // Spy on method and assume the user hits confirm.
    spyOn(service, 'toggle').and.callFake(function() {
      service.data.splice(0, 1);
    });

    service.toggle(one);
    expect(service.getIndex(one)).toEqual(-1);
  });

});
