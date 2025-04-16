import { fromLonLat } from 'ol/proj';

// Mock de 'fromLonLat' da biblioteca 'ol/proj'
jest.mock('ol/proj', () => ({
  fromLonLat: jest.fn(),
}));

describe('MapView Component', () => {
  it('should mock fromLonLat correctly', () => {
    // Chama a função 'fromLonLat' com as coordenadas [0, 0]
    fromLonLat([0, 0]);

    // Verifica se 'fromLonLat' foi chamada com os argumentos [0, 0]
    expect(fromLonLat).toHaveBeenCalledWith([0, 0]);
    
    // Agora simule o retorno da função 'fromLonLat' se necessário
    fromLonLat.mockReturnValue([1, 1]);
    const result = fromLonLat([1, 1]);

    // Verifica se o retorno da função mockada está correto
    expect(result).toEqual([1, 1]);
  });
});
