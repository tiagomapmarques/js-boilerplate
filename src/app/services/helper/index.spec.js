import { createElement } from 'testing';

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
            fetch.mockResponse({}, { status: statusCode });
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

    describe('element exists', () => {
      let elementContent;

      createElement(document.body, 'div', { id: mockId });

      beforeEach(() => {
        elementContent = HelperService.writeToDocumentById(mockId, mockContent);
      });

      it('writes correct content in new element', () => {
        expect(elementContent.innerHTML).toBe(mockContent);
      });
    });

    describe('element does not exist', () => {
      const elementContent = HelperService.writeToDocumentById(mockId, mockContent);

      it('writes correct content in new element', () => {
        expect(elementContent).toBeNull();
      });
    });
  });
});
