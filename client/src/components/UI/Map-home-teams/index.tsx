/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { getCenter } from 'geolib';
import Map, { Marker, Popup } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MapHomeTeams({ data, selectData }: any) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = data.map((result: any) => ({
    longitude: result.longitude,
    latitude: result.latitude
  }));

  const center: any = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 4,
    pitch: 0
  });

  return (
    <Map
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoibWFuc2Rlc21leiIsImEiOiJjbDF2NG55b2IwMDlxM2pwbGEwYnh1aDNlIn0.rBwxZ81BZ0mcpoI-jMqKgg"
      initialViewState={{
        longitude: 2.213749,
        latitude: 46.227638,
        zoom: 5
      }}
      style={{ width: '100%', height: '100vh' }}>
      {data.map((result: any) => (
        <div key={result.longitude}>
          {/* @ts-ignore */}
          <Marker longitude={result.longitude} latitude={result.latitude} offsetTop={-10}>
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl "
              aria-label="push-pin"
              role="img">
              <FaMapMarkerAlt className="h-6 text-red-500" />
            </p>
          </Marker>

          {/* @ts-ignore */}
          {selectedLocation.longitude === result.longitude ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.latitude}
              longitude={result.longitude}
              className="z-50">
              <Link to={`/team/${result._id}`}>{result.clubName}</Link>
            </Popup>
          ) : (
            <div></div>
          )}

          {selectData.longitude === result.longitude ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.latitude}
              longitude={result.longitude}
              className="z-50">
              <Link to={`/team/${result._id}`}>{result.clubName}</Link>
            </Popup>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </Map>
  );
}

export default MapHomeTeams;
