import { mockCreateElement } from 'testing';

import { HelperService } from '.';

describe('HelperService', () => {
  describe('#getJson', () => {
    const mockDataFilename = 'sample';
    const mockDataUrl = `${VARIABLES.SERVICES.ASSETS}${mockDataFilename}.json`;
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

  describe('#writeToDocumentById', () => {
    const mockId = 'mock-id';
    const mockContent = 'mock-content';
    const mockContentElement = `<span id="${mockId}">${mockContent}</span>`;

    describe('element exists', () => {
      let element;

      mockCreateElement(document.body, 'div', { id: mockId });

      describe('content given', () => {
        describe('is able to be converted to string', () => {
          beforeEach(() => {
            element = HelperService.writeToDocumentById(mockId, {}, false);
          });

          it('converts the content to string', () => {
            expect(element.innerHTML).toBe('[object Object]');
          });
        });

        describe('is not able to be converted to string', () => {
          beforeEach(() => {
            element.innerHTML = mockContent;
            element = HelperService.writeToDocumentById(mockId, null, false);
          });

          it('writes an empty string to the element', () => {
            expect(element.innerHTML).toBe('');
          });
        });
      });

      describe('element is to be replaced', () => {
        describe('content given is a single node', () => {
          beforeEach(() => {
            element = HelperService.writeToDocumentById(mockId, mockContentElement);
          });

          it('overrides the element with new element and content', () => {
            expect(element.outerHTML).toBe(mockContentElement);
          });
        });

        describe('content given is not a single node', () => {
          const doubleNodeHtml = `${mockContentElement}${mockContentElement}`;

          beforeEach(() => {
            element = HelperService.writeToDocumentById(mockId, doubleNodeHtml);
          });

          it('does not override the element', () => {
            expect(document.body.contains(element)).toBe(true);
          });

          it('writes the content inside the original element', () => {
            expect(element.innerHTML).toBe(doubleNodeHtml);
          });
        });
      });

      describe('element is not to be replaced', () => {
        beforeEach(() => {
          element = HelperService.writeToDocumentById(mockId, mockContent, false);
        });

        it('writes correct content in new element', () => {
          expect(element.innerHTML).toBe(mockContent);
        });
      });
    });

    describe('element does not exist', () => {
      const element = HelperService.writeToDocumentById(mockId, mockContent);

      it('writes correct content in new element', () => {
        expect(element).toBeNull();
      });
    });
  });
});
