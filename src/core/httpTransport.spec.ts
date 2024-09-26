/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import HTTPTransport from '@/core/httpTransport';
import queryStringify from '@/utils/queryStringify';
import { METHODS } from 'http';

const host = 'https://ya-praktikum.tech'; // убран префикс /api/v2

describe('HTTPTransport', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  it('should form URL with get params and call GET request', async () => {
    const http = new HTTPTransport('/test');
    const requestStub = sinon.stub(http, 'request').resolves();

    const options = { data: { a: '1', b: '2 2' } };
    await http.get('', options);

    const expectedUrl = `${host}/test?${queryStringify(options.data)}`;

    expect(requestStub.calledOnce).to.be.true;
    expect(requestStub.firstCall.args[0]).to.equal(expectedUrl);
    expect(requestStub.firstCall.args[1].method).to.equal('GET');
  });

  it('should form post request and pass the data', async () => {
    const http = new HTTPTransport('/test');
    const requestStub = sinon.stub(http, 'request').resolves();

    const data = { a: '1', b: '2' };
    await http.post('', { data });

    const expectedUrl = `${host}/test`;

    expect(requestStub.calledOnce).to.be.true;
    expect(requestStub.firstCall.args[0]).to.equal(expectedUrl);
    expect(requestStub.firstCall.args[1].method).to.equal('POST');
    expect(requestStub.firstCall.args[1].data).to.deep.equal(data);
  });

  it('should throw error if there is no method', async () => {
    const http = new HTTPTransport('/test');
    const requestStub = sinon.stub(http, 'request').rejects(new Error('No method'));

    try {
      await http.request(`${host}/test`, { method: undefined });
    } catch (error) {
      //@ts-expect-error wft
      expect(error.message).to.equal('No method');
    }
  });
});
