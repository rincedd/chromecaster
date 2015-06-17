import chai from 'chai';
import asPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(asPromised);
chai.use(sinonChai);
global.expect = chai.expect;
global.sinon = sinon;
