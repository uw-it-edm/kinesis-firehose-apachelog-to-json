import { Decorator } from './decorator';
import { Record } from './record.model';
import { expect } from 'chai';
import 'mocha';
import * as fs from 'fs';
import * as os from 'os';

describe('decorate function', () => {

  it('should determine geolocation for a US ip address', () => {
    const decorator = new Decorator();
    const record = new Record();

    record.clientIp = '172.217.12.174';

    decorator.decorate(record);

    const location = record.location;

    expect(record.city).to.equal('Mountain View');
    expect(record.country).to.equal('US');
    expect(record.metro).to.equal(807);
    expect(location.lat).to.equal(37.4192);
    expect(location.lon).to.equal(-122.0574);
    expect(record.postalCode).to.equal(94043);
    expect(record.region).to.equal('CA');
  });

  it('should determine geolocation for an Irish ip address', () => {
    const decorator = new Decorator();
    const record = new Record();

    record.clientIp = '54.239.34.171';

    decorator.decorate(record);

    const location = record.location;

    expect(record.city).to.equal('Dublin');
    expect(record.country).to.equal('IE');
    expect(record.metro).to.equal(0);
    expect(location.lat).to.equal(53.3389);
    expect(location.lon).to.equal(-6.2595);
    expect(record.postalCode).to.equal(0);
    expect(record.region).to.equal('07');
  });

  it('should parse Chrome iPhone user agent entry correctly', () => {
    const decorator = new Decorator();
    const record = new Record();

    record.agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D100 Safari/604.1';
    decorator.decorate(record);

    const userAgent = record.userAgent;
    expect(userAgent.model).to.equal('iPhone');
    expect(userAgent.name).to.equal('Mobile Safari');
    expect(userAgent.major).to.equal('11');
    expect(userAgent.minor).to.equal('0');
    expect(userAgent.patch).to.equal('0');
    expect(userAgent.os_name).to.equal('iOS');
    expect(userAgent.os_major).to.equal('11');
    expect(userAgent.os_minor).to.equal('2');
    expect(userAgent.os_patch).to.equal('6');
  });

  it('should parse Chrome user agent entry correctly', () => {
    const decorator = new Decorator();
    const record = new Record();

    record.agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36';

    decorator.decorate(record);

    const userAgent = record.userAgent;
    expect(userAgent.model).to.equal('Other');
    expect(userAgent.name).to.equal('Chrome');
    expect(userAgent.major).to.equal('64');
    expect(userAgent.minor).to.equal('0');
    expect(userAgent.patch).to.equal('3282');
    expect(userAgent.os_name).to.equal('Mac OS X');
    expect(userAgent.os_major).to.equal('10');
    expect(userAgent.os_minor).to.equal('12');
    expect(userAgent.os_patch).to.equal('6');
  });

  it('should parse Windows user agent entry correctly', () => {
    const decorator = new Decorator();
    const record = new Record();

    record.agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36';
    decorator.decorate(record);

    const userAgent = record.userAgent;
    expect(userAgent.model).to.equal('Other');
    expect(userAgent.name).to.equal('Chrome');
    expect(userAgent.major).to.equal('64');
    expect(userAgent.minor).to.equal('0');
    expect(userAgent.patch).to.equal('3282');
    expect(userAgent.os_name).to.equal('Windows');
    expect(userAgent.os_major).to.equal('10');
    expect(userAgent.os_minor).to.equal('0');
    expect(userAgent.os_patch).to.equal('0');
  });

});