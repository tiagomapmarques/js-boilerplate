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

      it('send the request to the right URL', () => {
        expect(fetch.mock.calls).toHaveLength(1);
        expect(fetch.mock.calls[0]).toEqual([mockDataUrl]);
      });

      it('get the parsed response', (done) => {
        response.then((data) => {
          expect(data).toEqual(mockData);
          done();
        });
      });
    });

    describe('request fails', () => {
      const errorData = { error: mockData.text };

      describe('on network issues', () => {
        beforeEach(() => {
          fetch.mockReject();
          response = HelperService.getJson(mockDataFilename, errorData);
        });

        it('returns the default data sent in second argument', (done) => {
          response.then((data) => {
            expect(data).toEqual(errorData);
            done();
          });
        });
      });

      const testResponseStatus = (statusCode) => {
        describe(`response returns a ${statusCode} status`, () => {
          beforeEach(() => {
            fetch.mockResponse({}, { status: statusCode });
            response = HelperService.getJson(mockDataFilename, errorData);
          });

          it('returns the default data sent in second argument', (done) => {
            response.then((data) => {
              expect(data).toEqual(errorData);
              done();
            });
          });
        });
      };

      [403, 404, 500].forEach(testResponseStatus);
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

      it('creates element as child of parent element', () => {
        expect(document.body.childNodes).toHaveLength(1);
        expect(document.body.childNodes[0].getAttribute('id')).toBe(mockId);
      });

      it('writes correct content in new element', () => {
        expect(elementContent).toBe(mockContent);
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
