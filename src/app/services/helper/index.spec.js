import { HelperService } from '.';

describe('HelperService', () => {
  const elementTypes = [
    {
      tag: 'span',
      elementType: 'HTMLSpanElement',
    },
    {
      tag: 'canvas',
      elementType: 'HTMLCanvasElement',
    },
    {
      tag: 'section',
      elementType: 'HTMLElement',
    },
  ];
  const elementData = 'mock-element-data';

  describe('#getJson', () => {
    const mockDataFilename = 'sample';
    const mockDataUrl = `${SERVICES.ASSETS}${mockDataFilename}.json`;
    const mockData = {
      text: 'mock-content',
      list: [{
        text: 'mock-object-content',
      }],
    };
    let response;

    afterEach(() => {
      fetch.resetMocks();
    });

    describe('request goes through correctly', () => {
      beforeEach(() => {
        fetch.mockResponse(JSON.stringify(mockData));
        response = HelperService.getJson(mockDataFilename);
      });

      it('sends the request to the right URL', () => {
        expect(fetch.mock.calls).toHaveLength(1);
        expect(fetch.mock.calls[0]).toEqual([mockDataUrl]);
      });

      it('gets the parsed response', (done) => {
        response.then((data) => {
          expect(data).toEqual(mockData);
          done();
        });
      });
    });

    describe('request fails', () => {
      const errorData = { error: mockData.text };

      const testResponseStatus = (statusCode) => {
        describe(`response returns a ${statusCode} status`, () => {
          beforeEach(() => {
            fetch.mockResponse('', { status: statusCode });
            response = HelperService.getJson(mockDataFilename, errorData);
          });

          it('returns the default data received', (done) => {
            response.then((data) => {
              expect(data).toEqual(errorData);
              done();
            });
          });
        });
      };

      [403, 404, 500].forEach(testResponseStatus);

      describe('network issues occur', () => {
        beforeEach(() => {
          fetch.mockReject();
          response = HelperService.getJson(mockDataFilename, errorData);
        });

        it('returns the default data received', (done) => {
          response.then((data) => {
            expect(data).toEqual(errorData);
            done();
          });
        });
      });
    });
  });

  describe('#createElement', () => {
    elementTypes.forEach((elementType) => {
      it('returns an element of the required tag', () => {
        const element = HelperService.createElement(elementType.tag);
        expect(element.constructor.name).toEqual(elementType.elementType);
      });
    });

    describe('the innerHTML given is a string', () => {
      it('contains the correct innerHTML', () => {
        const element = HelperService.createElement(elementTypes[0].tag, elementData);
        expect(element.innerHTML).toEqual(elementData);
      });
    });

    describe('the innerHTML given can be converted to a string', () => {
      it('contains the correct innerHTML', () => {
        const element = HelperService.createElement(elementTypes[0].tag, {
          toString: () => elementData,
        });
        expect(element.innerHTML).toEqual(elementData);
      });
    });
  });

  describe('#createStyleElement', () => {
    it('returns a style element', () => {
      const element = HelperService.createStyleElement(elementData);
      expect(element.tagName).toEqual('STYLE');
    });
  });
});
