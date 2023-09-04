import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Input,
  Skeleton,
  TextField,
  Typography,
} from '@material-ui/core';
import { LocationOn as LocationOnIcon, Close as CloseIcon } from '@material-ui/icons';
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

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
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  async function calculateRoute() {
    if (!originRef.current || !destinationRef.current) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  return (
    <Grid container className={classes.root}>
      <Box className={classes.mapContainer}>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgcolor='white'
        boxShadow={2}
        minWidth='container.md'
        zIndex='1'
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete>
              <TextField
                className={classes.inputBox}
                label='Origin'
                inputRef={originRef}
                variant='outlined'
                fullWidth
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete>
              <TextField
                className={classes.inputBox}
                label='Destination'
                inputRef={destinationRef}
                variant='outlined'
                fullWidth
              />
            </Autocomplete>
          </Grid>
        </Grid>
        <Box className={classes.buttonGroup}>
          <Button
            variant='contained'
            color='primary'
            onClick={calculateRoute}
          >
            Calculate Route
          </Button>
          <IconButton
            aria-label='clear-route'
            onClick={clearRoute}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={classes.results}>
          <Typography>Distance: {distance}</Typography>
          <Typography>Duration: {duration}</Typography>
          <IconButton
            aria-label='center-map'
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
