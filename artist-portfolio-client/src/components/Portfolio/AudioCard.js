import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Typography from '@mui/material/Typography';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioCard = ({
  image,
  alt,
  title,
  activeAudio,
  isPlaying,
  togglePlayPause,
  handleProgressClick,
  audioRef, 
  progress,
  category,
}) => {
  return (
    <div className={`audiocard ${category === 'classic' ? 'classic' : ''}`}>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia component="img" image={image} alt={alt} category={category} title={title}/>

        <Typography variant="subtitle1" sx={{ marginTop: '8px' }}>
            {title} 
          </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' , flexDirection: 'column',}}>
          <IconButton aria-label="play/pause" onClick={() => togglePlayPause(audioRef)} sx={{ background: 'transparent' }}>
            {activeAudio === audioRef && isPlaying ? (
              <PauseIcon
                sx={{
                  height: 38,
                  width: 38,
                  fontSize: '2rem',
                  color: 'red',
                }}
              />
            ) : (
              <PlayArrowIcon
                sx={{
                  height: 38,
                  width: 38,
                  fontSize: '2rem',
                  color: 'rgb(70, 73, 70)',
                }}
              />
            )}
          </IconButton>

        </Box>
      </Card>
    </div>
  );
};

export default AudioCard;
