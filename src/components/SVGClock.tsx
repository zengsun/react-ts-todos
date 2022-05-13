import React from 'react';
import { useNow } from '../hooks';

const SVGClock: React.FC<{}> = (props) => {
  const now = useNow(),
    seconds = now.getSeconds(),
    secondsDegrees = `rotate(${(seconds / 60) * 360}deg)`,
    mins = now.getMinutes(),
    minsDegrees = `rotate(${(mins / 60) * 360 + (seconds / 60) * 6}deg)`,
    hour = now.getHours(),
    hourDegrees = `rotate(${(hour / 12) * 360 + (mins / 60) * 30}deg)`;
  return (
    <svg viewBox="0 0 100 100" width="100" height="100">
      <circle
        stroke="#adcd3c"
        fill="#f2fddb"
        stroke-width="3"
        cx="50"
        cy="50"
        r="45"
      />
      <g stroke="#adcd3c">
        <line x1="50.00" y1="5.000" x2="50.00" y2="10.00"></line>
        <line x1="72.50" y1="11.03" x2="70.00" y2="15.36"></line>
        <line x1="88.97" y1="27.50" x2="84.64" y2="30.00"></line>
        <line x1="95.00" y1="50.00" x2="90.00" y2="50.00"></line>
        <line x1="88.97" y1="72.50" x2="84.64" y2="70.00"></line>
        <line x1="72.50" y1="88.90" x2="70.00" y2="84.64"></line>
        <line x1="50.00" y1="95.00" x2="50.00" y2="90.00"></line>
        <line x1="27.50" y1="88.90" x2="30.00" y2="84.64"></line>
        <line x1="11.03" y1="72.50" x2="15.36" y2="70.00"></line>
        <line x1="5.000" y1="50.00" x2="10.00" y2="50.00"></line>
        <line x1="11.03" y1="27.50" x2="15.36" y2="30.00"></line>
        <line x1="27.50" y1="11.00" x2="30.00" y2="15.36"></line>
      </g>
      <g
        style={{
          fontSize: '.75rem',
          textAnchor: 'middle',
          stroke: 'none',
          fill: '#92b0dd',
        }}
      >
        <text x="50" y="20">
          12
        </text>
        <text x="85" y="55">
          3
        </text>
        <text x="50" y="88">
          6
        </text>
        <text x="15" y="55">
          9
        </text>
      </g>
      <g>
        <line
          className="hour"
          stroke="#adcd3c"
          stroke-width="3"
          x1="50"
          y1="50"
          x2="50"
          y2="26"
          style={{
            transformOrigin: 'center center',
            transform: hourDegrees,
          }}
        />
        <line
          className="minute"
          stroke="#94cd3c"
          stroke-width="2"
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          style={{
            transformOrigin: 'center center',
            transform: minsDegrees,
          }}
        />
        <line
          className="second"
          stroke="#ff6400"
          stroke-width="1"
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          style={{
            transformOrigin: 'center center',
            transform: secondsDegrees,
          }}
        />
        <circle cx="50" cy="50" r="3" fill="#535353" />
      </g>
    </svg>
  );
};

export default SVGClock;
