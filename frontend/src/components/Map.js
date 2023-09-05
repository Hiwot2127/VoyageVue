import React, { useState, useRef } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { LocationOn as LocationOnIcon, Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import L from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const center = { lat: 48.8584, lng: 2.2945 };

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  mapContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  inputBox: {
    flexGrow: 1,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  results: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function Map() {
  const classes = useStyles();
  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const routeCoordinates = [];
  const markers = [];
  let route = L.polyline(routeCoordinates, { color: 'blue' });

  const myMap = L.map('map').setView([center.lat, center.lng], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);

  myMap.on('click', function (event) {
    // Extract latitude and longitude from the click event
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    if (routeCoordinates.length === 0) {
      markers.forEach((marker) => myMap.removeLayer(marker));
      myMap.removeLayer(route);
    }

    markers.push(L.marker([lat, lng]).addTo(myMap));
    routeCoordinates.push([lat, lng]);

    if (routeCoordinates.length === 2) {
      route = L.polyline(routeCoordinates, { color: 'blue' }).addTo(myMap);
    }
  });

  return (
    <Grid container className={classes.root}>
      <Box className={classes.mapContainer} id="map"></Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgcolor="white"
        boxShadow={2}
        minWidth="container.md"
        zIndex="1"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              className={classes.inputBox}
              label="Origin"
              inputRef={originRef}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.inputBox}
              label="Destination"
              inputRef={destinationRef}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Box className={classes.buttonGroup}>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Calculate Route
          </Button>
          <IconButton aria-label="clear-route" onClick={() => {}}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={classes.results}>
          <Typography>Distance: {distance}</Typography>
          <Typography>Duration: {duration}</Typography>
          <IconButton
            aria-label="center-map"
            onClick={() => {
              map && map.panTo(center);
              map && map.setZoom(15);
            }}
          >
            <LocationOnIcon />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
}

export default Map;
