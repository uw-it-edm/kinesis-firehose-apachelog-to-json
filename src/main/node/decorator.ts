import * as Agent from 'useragent';
import * as GeoIp from 'geoip-lite';
import {Record} from './record.model';
import {GeoLocation} from './geolocation.model';
import {UserAgent} from './user-agent.model';

export class Decorator {
  
  decorate(record: Record) {
    Decorator.geoLookup(record);
    Decorator.userAgentLookup(record);
  }

  static geoLookup(record: Record) {
    const found = GeoIp.lookup(record.clientIp);
    if (found) {
      record.tags.push('geolocated');

      console.log('Geolocation:');
      console.log(found);

      const location = new GeoLocation();
      location.lat = found.ll[0];
      location.lon = found.ll[1];

      record.city = found.city;
      record.country = found.country;
      record.metro = found.metro;
      record.postalCode = found.zip;
      record.region = found.region;
      record.location = location;
    }
  }

  static userAgentLookup(record: Record) {
    const agent = Agent.lookup(record.agent);

    if (agent) {
      const userAgent = new UserAgent();
      record.tags.push('agentparsed');

      const os = agent.os;
      const device = agent.device;

      if (os) {
        console.log(os);
        userAgent.os_name = os.family;
        userAgent.os_major = os.major;
        userAgent.os_minor = os.minor;
        userAgent.os_patch = os.patch;
      }

      if (device) {
        userAgent.model = device.family;
      }

      userAgent.name = agent.family;
      userAgent.major = agent.major;
      userAgent.minor = agent.minor;
      userAgent.patch = agent.patch;

      record.userAgent = userAgent;
    }

  }
}