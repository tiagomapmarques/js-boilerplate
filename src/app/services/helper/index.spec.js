import { mockCreateElement } from 'testing';

import { HelperService } from '.';

describe('HelperService', () => {
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

  describe('#naiveRender', () => {
    const mockId = 'mock-id';
    const mockContent = 'mock-content';
    const mockContentElement = `<span id="${mockId}">${mockContent}</span>`;

    describe('element exists', () => {
      let elements;

      mockCreateElement(document.body, 'div', { id: mockId });

      describe('content given', () => {
        describe('is able to be converted to string', () => {
          beforeEach(() => {
            elements = HelperService.naiveRender(`#${mockId}`, {});
          });

          it('converts the content to string', () => {
            expect(elements).toHaveLength(1);
            expect(elements[0].innerHTML).toBe('[object Object]');
          });
        });

        describe('is not able to be converted to string', () => {
          beforeEach(() => {
            elements = HelperService.naiveRender(`#${mockId}`, null);
          });

          it('writes an empty string to the element', () => {
            expect(elements).toHaveLength(1);
            expect(elements[0].innerHTML).toBe('');
          });
        });
      });

      describe('element is to be replaced', () => {
        describe('content given is a single node', () => {
          beforeEach(() => {
            elements = HelperService.naiveRender(`#${mockId}`, mockContentElement, true);
          });

          it('overrides the element with new element and content', () => {
            expect(elements).toHaveLength(1);
            expect(elements[0].outerHTML).toBe(mockContentElement);
          });
        });

        describe('content given is not a single node', () => {
          const doubleNodeHtml = `${mockContentElement}${mockContentElement}`;
          let persitentElement;

          beforeEach(() => {
            persitentElement = document.getElementById(mockId);
            elements = HelperService.naiveRender(`#${mockId}`, doubleNodeHtml, true);
          });

          it('does not override the element', () => {
            expect(elements).toHaveLength(1);
            expect(elements[0]).toBe(persitentElement);
          });

          it('writes the content inside the original element', () => {
            expect(elements).toHaveLength(1);
            expect(elements[0].innerHTML).toBe(doubleNodeHtml);
          });
        });
      });

      describe('element is not to be replaced', () => {
        let persitentElement;

        beforeEach(() => {
          persitentElement = document.getElementById(mockId);
          elements = HelperService.naiveRender(`#${mockId}`, mockContent);
        });

        it('does not override the element', () => {
          expect(elements).toHaveLength(1);
          expect(elements[0]).toBe(persitentElement);
        });

        it('writes the content inside the original element', () => {
          expect(elements).toHaveLength(1);
          expect(elements[0].innerHTML).toBe(mockContent);
        });
      });
    });

    describe('element does not exist', () => {
      const elements = HelperService.naiveRender(`#${mockId}`, mockContent, true);

      it('writes correct content in new element', () => {
        expect(elements).toHaveLength(0);
      });
    });
  });
});
